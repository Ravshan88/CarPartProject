package com.example.backend.controller;

import com.example.backend.entity.Advertisement;
import com.example.backend.service.AdvertisimentService.AdvertisementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/advertisement")
@RequiredArgsConstructor
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    @GetMapping
    public HttpEntity<?> getAdvertisement() {
        return advertisementService.getAdvertisement();
    }

    @PostMapping
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public HttpEntity<?> addAdvertisement(@RequestBody Advertisement advertisement) {
        return advertisementService.addAdvertisement(advertisement);
    }

    @PutMapping
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public HttpEntity<?> editAdvertisement(@RequestBody Advertisement advertisement) {
        return advertisementService.editAdvertisement(advertisement);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public HttpEntity<?> deleteAdvertisement(@PathVariable Integer id) {
        return advertisementService.deleteAdvertisement(id);
    }
}
