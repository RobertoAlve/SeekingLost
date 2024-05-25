package br.com.seekinglost.api.configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicSessionCredentials;
import com.amazonaws.auth.DefaultAWSCredentialsProviderChain;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
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

    @Value("${aws.use-credentials}")
    private boolean useCredentials;

    @Bean
    public BasicSessionCredentials getBasicSessionCredentials() {
        return new BasicSessionCredentials(accessKey, secretKey, sessionToken);
    }

    @Bean
    public DefaultAWSCredentialsProviderChain getDefaultAWSCredentialProviderChain() {
        return new DefaultAWSCredentialsProviderChain();
    }

    @Bean
    public AmazonS3 getAmazonS3() {
        AmazonS3 amazonS3 = null;

        if (useCredentials) {
            amazonS3 = AmazonS3ClientBuilder.standard()
                    .withRegion(region)
                    .withCredentials(new AWSStaticCredentialsProvider(getBasicSessionCredentials()))
                    .build();
        } else {
            amazonS3 = AmazonS3ClientBuilder.standard()
                    .withRegion(region)
                    .withCredentials(getDefaultAWSCredentialProviderChain())
                    .build();
        }

        return amazonS3;
    }

}
