package br.com.seekinglost.api.listener;

import br.com.seekinglost.api.model.entitys.AWSCredentialsResponse;
import br.com.seekinglost.api.service.AwsCredentialsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

@Slf4j
public class CredentialsInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    private final AwsCredentialsService credentialsService = new AwsCredentialsService();

    @Autowired
    private ConfigurableEnvironment env;

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        try {
            AWSCredentialsResponse credentials = credentialsService.getCredentials();

            Map<String, Object> envVars = new HashMap<>();
            envVars.put("AWS_ACCESS_KEY", credentials.getAccessKeyId());
            envVars.put("AWS_SECRET_KEY", credentials.getSecretAccessKey());
            envVars.put("AWS_SESSION_TOKEN", credentials.getToken());

            applicationContext.getEnvironment().getPropertySources().addFirst(new MapPropertySource("dynamicEnvVars", envVars));

        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}