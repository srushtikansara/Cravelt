package com.cravelt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;

@SpringBootApplication
public class CraveltApplication {

	@Value("${spring.mongodb.uri}")
	private String mongoUri;             // ← add this

    public static void main(String[] args) {
        SpringApplication.run(CraveltApplication.class, args);
    }

    @PostConstruct                        // ← add this whole method
    public void logMongoUri() {
        System.out.println(">>> MONGO URI = " + mongoUri);
    }

}