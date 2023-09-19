package com.example.backend.service.SecurityService;

import org.springframework.http.HttpEntity;

public interface SecurityService {
    HttpEntity<?> checkSecurity(String authorization);
}
