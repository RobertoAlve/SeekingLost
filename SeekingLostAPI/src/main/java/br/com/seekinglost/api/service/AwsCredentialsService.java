package br.com.seekinglost.api.service;

import br.com.seekinglost.api.model.entitys.AWSCredentialsResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class AwsCredentialsService {

    private final String endpoint = "http://169.254.169.254/latest/meta-data/identity-credentials/ec2/security-credentials/ec2-instance/";
    private final HttpClient httpClient;

    public AwsCredentialsService() {
        this.httpClient = HttpClient.newHttpClient();
    }

    public AWSCredentialsResponse getCredentials() throws IOException, InterruptedException {
        HttpResponse<String> response = this.httpClient.send(getRequest(), HttpResponse.BodyHandlers.ofString());
        ObjectMapper objectMapper = new ObjectMapper();

        return objectMapper.readValue(response.body(), AWSCredentialsResponse.class);
    }

    public HttpRequest getRequest() {
        return HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .timeout(Duration.ofSeconds(30))
                .GET()
                .build();
    }
}
