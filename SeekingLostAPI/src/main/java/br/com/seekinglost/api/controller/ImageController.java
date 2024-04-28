package br.com.seekinglost.api.controller;

import br.com.seekinglost.api.enums.ImageResponseEnum;
import br.com.seekinglost.api.model.responses.ImageApiResponse;
import br.com.seekinglost.api.model.responses.ImageResponse;
import br.com.seekinglost.api.model.responses.UriResponse;
import br.com.seekinglost.api.service.integration.azure.s3.S3ImageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private S3ImageService s3ImageService;

    @GetMapping("/{token}")
    private ResponseEntity<UriResponse> getImageForUser(@PathVariable String token) {
        try {
            return ResponseEntity.ok().body(new UriResponse(s3ImageService.getUrlFirstImageFromDirectory(token).toURI().toString()));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/upload/{token}")
    private ResponseEntity<ImageApiResponse> uploadImages(@RequestParam("files") MultipartFile[] images, @PathVariable String token) {
        ImageApiResponse response = new ImageApiResponse();
        for (MultipartFile image : images) {
            if (!image.isEmpty()) {
                try {
                    File tempFile = File.createTempFile("temp", null);
                    image.transferTo(tempFile);
                    s3ImageService.uploadImage(tempFile, token + "/" + image.getOriginalFilename());
                    tempFile.delete();

                    response.addStatus(ImageResponseEnum.UPLOAD, new ImageResponse(ImageResponseEnum.UPLOAD.getMessage()));
                } catch (IOException e) {
                    log.error(e.getMessage(), e);
                    response.addStatus(ImageResponseEnum.ERROR, new ImageResponse(e.getMessage()));
                }
            }
        }

        if (response.hasError())
            return ResponseEntity.badRequest().body(response);
        else
            return ResponseEntity.ok().body(response);
    }

}
