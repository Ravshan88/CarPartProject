package com.example.backend.controller;

import com.example.backend.dto.CurrentUser;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.payload.ReqLogin;
import com.example.backend.security.JwtService;
import com.example.backend.service.AuthService.AuthService.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService service;
    private final JwtService jwtService;

    @PostMapping("/login")
    public HttpEntity<?> login(@Valid @RequestBody UserDTO dto) {
        return service.login(dto);
    }

    @PostMapping("/register/admin")
    public HttpEntity<?> register(@RequestBody ReqLogin dto) {
        return service.register(dto);
    }


    @PostMapping("/register/operator")
    public HttpEntity<?> registerOperator(@RequestBody ReqLogin dto) {
        return service.registerOperator(dto);
    }
    @GetMapping("/register/operator")
    public HttpEntity<?> registerOperator() {
        return service.getOperator();
    }

    @PostMapping("/refresh")
    public HttpEntity<?> refreshUser(@RequestParam String refreshToken) {
        return service.refreshToken(refreshToken);
    }

    @GetMapping("/decode")
    public HttpEntity<?> decode(@CurrentUser User user) {
        return ResponseEntity.ok(user);
    }

}
