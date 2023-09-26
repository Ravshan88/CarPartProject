package com.example.backend.service.productService;

import com.example.backend.dto.ProductDTO;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface ProductService {
    HttpEntity<?> addProduct(ProductDTO productDTO, MultipartFile photo, String prefix);

    HttpEntity<?> getProducts(String name, Integer page, Integer size);

    HttpEntity<?> editProduct(ProductDTO productDTO, MultipartFile photo, String prefix);

    void deleteProduct(UUID id, String attachmentName);
}
