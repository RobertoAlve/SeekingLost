package br.com.seekinglost.api.controller;

import br.com.seekinglost.api.service.integration.azure.s3.S3ImageService;
import com.amazonaws.services.s3.model.S3Object;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private S3ImageService s3ImageService;

    @GetMapping("/{userKey}")
    private ResponseEntity<S3Object> getImageForUser(@PathVariable String userKey) {
        try {
            return ResponseEntity.ok().body(s3ImageService.getFirstImageFromDirectory(userKey));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/upload")
    private ResponseEntity<String> uploadImages(@RequestParam("files") MultipartFile[] images) {
        Map<String, Exception> errors = new HashMap<>();

        for (MultipartFile image : images) {
            if (!image.isEmpty()) {
                try {
                    File tempFile = File.createTempFile("temp", null);
                    image.transferTo(tempFile);
                    s3ImageService.uploadImage(tempFile, image.getOriginalFilename());
                    tempFile.delete();
                } catch (IOException e) {
                    log.error(e.getMessage(), e);
                    errors.put(e.getMessage(), e);
                }
            }
        }

        if (errors.isEmpty())
            return ResponseEntity.ok().body("Upload success!");
        else
            return ResponseEntity.badRequest().body("Upload error!");
    }

}
