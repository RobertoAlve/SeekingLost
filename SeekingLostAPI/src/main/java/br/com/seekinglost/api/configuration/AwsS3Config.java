package br.com.seekinglost.api.configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3Config {

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

    @Bean
    public BasicSessionCredentials getBasicSessionCredentials() {
        return new BasicSessionCredentials(accessKey, secretKey, sessionToken);
    }

    @Bean
    public AmazonS3 getAmazonS3() {
        return AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(getBasicSessionCredentials()))
                .build();
    }

}
