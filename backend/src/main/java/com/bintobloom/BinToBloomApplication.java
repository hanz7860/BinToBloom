package com.bintobloom;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BinToBloomApplication {
    public static void main(String[] args) {
        SpringApplication.run(BinToBloomApplication.class, args);
    }
}
