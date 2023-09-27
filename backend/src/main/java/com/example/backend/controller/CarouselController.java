package com.example.backend.controller;

import com.example.backend.service.carouselService.CarouselService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/carousel")
@RequiredArgsConstructor
public class CarouselController {
    private final CarouselService carouselService;

    @PostMapping
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public HttpEntity<?> uploadCarousel(@RequestParam MultipartFile photo, @RequestParam String prefix) {
        return carouselService.uploadCarousel(photo, prefix);
    }

    @DeleteMapping
//    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    public void deleteCarousel(@RequestParam UUID id, @RequestParam String attachmentName) {
        carouselService.deleteCarousel(id, attachmentName);
    }

    @GetMapping
    public HttpEntity<?> getCarousel() {
        return carouselService.getCarousel();
    }
}
