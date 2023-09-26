package com.example.backend.service.carouselService;

import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface CarouselService {
    HttpEntity<?> uploadCarousel(MultipartFile photo, String prefix);

   void deleteCarousel(UUID id, String attachmentId);

    HttpEntity<?> getCarousel();

}
