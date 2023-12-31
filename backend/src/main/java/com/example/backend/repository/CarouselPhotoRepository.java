package com.example.backend.repository;

import com.example.backend.entity.CarouselPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CarouselPhotoRepository extends JpaRepository<CarouselPhoto, UUID> {
}