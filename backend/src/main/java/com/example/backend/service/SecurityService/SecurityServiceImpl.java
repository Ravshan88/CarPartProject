package com.example.backend.service.SecurityService;

import com.example.backend.service.AuthService.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SecurityServiceImpl implements SecurityService {
    private final AuthService authService;
    @Override
    public HttpEntity<?> checkSecurity(String authorization){
        return ResponseEntity.ok(authService.decode(authorization).getRoles());
    }
}
