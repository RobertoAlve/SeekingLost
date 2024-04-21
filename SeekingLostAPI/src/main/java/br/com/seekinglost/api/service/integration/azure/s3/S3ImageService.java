package br.com.seekinglost.api.service.integration.azure.s3;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class S3ImageService {

    @Value("${aws.access-key}")
    private String accessKey;

    @Value("${aws.secret-key}")
    private String secretKey;

    @Value("${aws.session-token}")
    private String sessionToken;

    @Value("${aws.region}")
    private String region;

    @Value("${aws.bucket-name}")
    private String bucketName;

    private AmazonS3 s3client;

    public void initialize() {
        BasicSessionCredentials credentials = new BasicSessionCredentials(accessKey, secretKey, sessionToken);
        this.s3client = AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
    }

    public void uploadImage(File imageFile, String keyName) {
        this.initialize();
        PutObjectRequest request = new PutObjectRequest(bucketName, keyName, imageFile);
        s3client.putObject(request);
    }

    public S3Object downloadImage(String keyName) {
        this.initialize();
        GetObjectRequest request = new GetObjectRequest(bucketName, keyName);
        return s3client.getObject(request);
    }

    public void downloadImageToFile(String keyName, String filePath) throws IOException {
        this.initialize();
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
        this.initialize();
        DeleteObjectRequest request = new DeleteObjectRequest(bucketName, keyName);
        s3client.deleteObject(request);
    }

    public S3Object getFirstImageFromDirectory(String directoryPath) {
        this.initialize();
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

}
