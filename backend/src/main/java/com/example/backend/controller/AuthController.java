package com.example.backend.controller;

import com.example.backend.dto.CurrentUser;
import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.payload.ReqLogin;
import com.example.backend.security.JwtService;
import com.example.backend.service.AuthService.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> register(@RequestBody ReqLogin dto) {
        return service.register(dto);
    }
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> getAdmin() {
        return service.getAdmin();
    }


    @PostMapping("/register/operator")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> registerOperator(@RequestBody ReqLogin dto) {
        return service.registerOperator(dto);
    }
    @GetMapping("/operator")
    public HttpEntity<?> getOperator() {
        return service.getOperator();
    }

    @DeleteMapping("/user/{id}")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> deleteUser(@PathVariable UUID id) {
        return service.deleteUser(id);
    }

    @PutMapping("/user/{id}")
    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
    public HttpEntity<?> updateUser(@RequestBody ReqLogin dto, @PathVariable UUID id) {
        return service.updateUser(dto, id);
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
