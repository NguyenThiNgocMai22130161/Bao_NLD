package vn.edu.hcmuaf.fit.ThreePanthers;

import java.text.Normalizer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import vn.edu.hcmuaf.fit.ThreePanthers.entities.PostEntity;
import vn.edu.hcmuaf.fit.ThreePanthers.repositories.PostRepository;

@SpringBootApplication
public class ThreePanthersApplication {

  public static void main(String[] args) {
    SpringApplication.run(ThreePanthersApplication.class, args);
  }
}
