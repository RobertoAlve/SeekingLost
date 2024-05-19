package br.com.seekinglost.api.listener;

import br.com.seekinglost.api.model.entitys.AWSCredentialsResponse;
import br.com.seekinglost.api.service.AwsCredentialsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ApplicationListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class ApplicationStartup implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Autowired
    private AwsCredentialsService credentialsService;

    @Autowired
    private ConfigurableEnvironment env;

    @Override
    public void initialize(ConfigurableApplicationContext  applicationContext) {
        try {
//            AWSCredentialsResponse credentials = credentialsService.getCredentials();

            Map<String, Object> envVars = new HashMap<>();
            envVars.put("AWS_ACCESS_KEY", "Test");
            envVars.put("AWS_SECRET_KEY", "Test1");
            envVars.put("AWS_SESSION_TOKEN", "Test2");

            applicationContext.getEnvironment().getPropertySources().addFirst(new MapPropertySource("dynamicEnvVars", envVars));

        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }
}