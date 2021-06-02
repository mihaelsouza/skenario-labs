package com.skenariolabs.propertyviewer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class PropertyViewerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PropertyViewerApplication.class, args);
	}

}
