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
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

@Slf4j
@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private S3ImageService s3ImageService;

    @GetMapping("/{token}")
    private ResponseEntity<UriResponse> getImageForUser(@PathVariable String token) {
        try {
            return ResponseEntity.ok().body(new UriResponse(
                    new ArrayList<>(Collections.singletonList(
                            s3ImageService.getUrlFirstImageFromDirectory(token).toURI().toString()
                    ))
            ));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/all-images/{token}")
    private ResponseEntity<UriResponse> getImagesForUser(@PathVariable String token) {
        List<String> uris = new ArrayList<>();
        List<URL> urls = s3ImageService.getUrlsImagesFromDirectory(token);
        AtomicBoolean convertError = new AtomicBoolean(false);

        urls.forEach(url -> {
            try {
                uris.add(url.toURI().toString());
            } catch (URISyntaxException e) {
                log.error(e.getMessage(), e);
                convertError.set(true);
            }
        });

        if (convertError.get())
            return ResponseEntity.badRequest().build();

        try {
            return ResponseEntity.ok().body(new UriResponse(new ArrayList<>(uris)));
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/results/{token}")
    private ResponseEntity<UriResponse> getResults(@PathVariable String token) {
        ImageApiResponse response = new ImageApiResponse();
        List<String> uris = new ArrayList<>();
        List<URL> urls = s3ImageService.getResults(token, response);
        AtomicBoolean convertError = new AtomicBoolean(false);

        if (response.hasError())
            return ResponseEntity.badRequest().body(new UriResponse(Collections.singletonList("Not found images!")));

        urls.forEach(url -> {
            try {
                uris.add(url.toURI().toString());
            } catch (URISyntaxException e) {
                log.error(e.getMessage(), e);
                convertError.set(true);
            }
        });

        if (convertError.get())
            return ResponseEntity.badRequest().build();

        try {
            return ResponseEntity.ok().body(new UriResponse(new ArrayList<>(uris)));
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

    @DeleteMapping
    private ResponseEntity<ImageApiResponse> deleteImage(@RequestParam String uri) {
        ImageApiResponse response = new ImageApiResponse();

        try {
            s3ImageService.deleteImageByUri(uri);
        } catch (URISyntaxException e) {
            response.addStatus(ImageResponseEnum.ERROR_DELETE, new ImageResponse(ImageResponseEnum.ERROR_DELETE.getMessage()));
        }

        if (response.hasError())
            return ResponseEntity.badRequest().body(response);
        else
            return ResponseEntity.ok().body(response);
    }
}
