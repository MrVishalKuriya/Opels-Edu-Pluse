package com.college.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                // allowedOriginPatterns supports wildcards — covers ALL Vercel preview URLs
                .allowedOriginPatterns(
                        "https://*.vercel.app",       // All Vercel preview & prod deployments
                        "https://college-student-management-rkxi.vercel.app", // Main Vercel URL
                        "https://college-student-management.onrender.com",    // Render self-call
                        "http://localhost:*",          // Local dev (any port)
                        "http://127.0.0.1:*"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")
                .allowedHeaders("*")
                .maxAge(3600);
    }
}
