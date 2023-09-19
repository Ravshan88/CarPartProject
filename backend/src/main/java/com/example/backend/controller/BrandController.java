package com.example.backend.controller;

import com.example.backend.dto.BrandDTO;
import com.example.backend.service.brandService.BrandService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/brand")
@RequiredArgsConstructor
public class BrandController {
    private final BrandService brandService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @SneakyThrows
    @PostMapping
    public HttpEntity<?> addBrand(@Valid @RequestParam String data,
                                  @RequestParam(required = false) MultipartFile photo,
                                  @RequestParam String prefix) {
        BrandDTO brandDTO = objectMapper.readValue(data, BrandDTO.class);
        return brandService.addBrand(brandDTO, photo, prefix);
    }

    @SneakyThrows
    @PutMapping("/{id}")
    public HttpEntity<?> editBrand(@Valid @RequestParam String data,
                                   @RequestParam(required = false) MultipartFile photo,
                                   @RequestParam String prefix, @PathVariable UUID id) {
        BrandDTO brandDTO = objectMapper.readValue(data, BrandDTO.class);
        return brandService.editBrand(brandDTO, photo, prefix, id);
    }

    @GetMapping
    public HttpEntity<?> getBrands(@RequestParam(defaultValue = "") String name,
                                   @RequestParam(defaultValue = "1") Integer page,
                                   @RequestParam(defaultValue = "5") Integer size) {
        return brandService.getBrands(name, page, size);
    }
}
