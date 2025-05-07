package com.uet.longhoang.engapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories("com.uet.longhoang.engapp.repositories")
public class EngappApplication {

    public static void main(String[] args) {
        SpringApplication.run(EngappApplication.class, args);
    }

}
