package com.example.backend.service.brandService;

import com.example.backend.dto.BrandDTO;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface BrandService {

    HttpEntity<?> addBrand(String name, MultipartFile photo, String prefix);

    HttpEntity<?> editBrand(BrandDTO brandDTO, MultipartFile photo, String prefix, UUID id);

    HttpEntity<?> getBrands(String name, Integer page, Integer size);
}
