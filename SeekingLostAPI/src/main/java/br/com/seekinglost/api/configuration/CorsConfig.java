package br.com.seekinglost.api.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                    "http://localhost:4200",
                    "http://localhost:80",
                    "http://localhost",
                    "http://52.44.122.122",
                    "http://52.44.122.122:80",
                    "http://seekinglost.3utilities.com",
                    "http://seekinglost.3utilities.com:80",
                    "http://seekinglost.3utilities.com:4200"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowCredentials(true);
    }
}
