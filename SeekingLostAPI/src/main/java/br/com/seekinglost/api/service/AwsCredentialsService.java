package br.com.seekinglost.api.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

@Service
public class CredentialsService {

    private final String endpoint = "http://169.254.169.254/latest/meta-data/identity-credentials/ec2/security-credentials/ec2-instance/";
    private final HttpClient httpClient;

    public CredentialsService() {
        this.httpClient = HttpClient.newHttpClient();
    }

    public HttpResponse getCredentials() throws IOException, InterruptedException {
        HttpResponse<String> response = this.httpClient.send(getRequest(), HttpResponse.BodyHandlers.ofString());

        return response;
    }

    public HttpRequest getRequest() {
        return HttpRequest.newBuilder()
                .uri(URI.create(endpoint))
                .GET()
                .build();
    }
}
