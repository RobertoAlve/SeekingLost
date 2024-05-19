package br.com.seekinglost.api;

import br.com.seekinglost.api.listener.CredentialsInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SeekingLostApiApplication {

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(SeekingLostApiApplication.class);
		application.addInitializers(new CredentialsInitializer());
		application.run(args);
	}

}
