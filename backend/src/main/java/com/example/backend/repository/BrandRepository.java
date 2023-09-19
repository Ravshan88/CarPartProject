package com.example.backend.repository;

import com.example.backend.entity.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BrandRepository extends JpaRepository<Brand, UUID> {
    Page<Brand> findByNameContainingIgnoreCase(String name, Pageable pageable);
}