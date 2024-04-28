package br.com.seekinglost.api.service.integration.azure.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.List;

@Service
public class S3ImageService {

    @Value("${aws.bucket-name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3client;

    public void uploadImage(File imageFile, String keyName) {
        PutObjectRequest request = new PutObjectRequest(bucketName, keyName, imageFile);
        s3client.putObject(request);
    }

    public S3Object downloadImage(String keyName) {
        GetObjectRequest request = new GetObjectRequest(bucketName, keyName);
        return s3client.getObject(request);
    }

    public void downloadImageToFile(String keyName, String filePath) throws IOException {
        S3Object s3Object = downloadImage(keyName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        FileOutputStream fileOutputStream = new FileOutputStream(new File(filePath));

        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            fileOutputStream.write(buffer, 0, bytesRead);
        }

        fileOutputStream.close();
        inputStream.close();
    }

    public void deleteImage(String keyName) {
        DeleteObjectRequest request = new DeleteObjectRequest(bucketName, keyName);
        s3client.deleteObject(request);
    }

    public S3Object getFirstImageFromDirectory(String directoryPath) {
        ListObjectsV2Request request = new ListObjectsV2Request()
                .withBucketName(bucketName)
                .withPrefix(directoryPath + "/")
                .withMaxKeys(1);

        ListObjectsV2Result objectListing = s3client.listObjectsV2(request);
        List<S3ObjectSummary> objects = objectListing.getObjectSummaries();

        if (objects.isEmpty()) {
            throw new RuntimeException("No images found in the directory.");
        }

        String firstImageKey = objects.getFirst().getKey();
        return s3client.getObject(bucketName, firstImageKey);
    }

    public URL getUrlFirstImageFromDirectory(String directoryPath) {
        ListObjectsV2Request request = new ListObjectsV2Request()
                .withBucketName(bucketName)
                .withPrefix(directoryPath + "/")
                .withMaxKeys(1);

        ListObjectsV2Result objectListing = s3client.listObjectsV2(request);
        List<S3ObjectSummary> objects = objectListing.getObjectSummaries();

        if (objects.isEmpty()) {
            throw new RuntimeException("No images found in the directory.");
        }

        String firstImageKey = objects.getFirst().getKey();
        return s3client.getUrl(bucketName, firstImageKey);
    }
}
