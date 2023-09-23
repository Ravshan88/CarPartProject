package com.example.backend.service.productService;

import com.example.backend.dto.ProductDTO;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    HttpEntity<?> addProduct(ProductDTO productDTO, MultipartFile photo, String prefix);

    HttpEntity<?> getProducts(String name, Integer page, Integer size);

    HttpEntity<?> editProduct(ProductDTO productDTO, MultipartFile photo, String prefix);
}
