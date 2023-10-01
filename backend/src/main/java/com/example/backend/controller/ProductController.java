package com.example.backend.controller;

import com.example.backend.dto.CartPartDTO;
import com.example.backend.dto.ProductDTO;
import com.example.backend.service.productService.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @SneakyThrows
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public HttpEntity<?> addProduct(@Valid @RequestParam String data,
                                    @RequestParam(required = false) MultipartFile photo,
                                    @RequestParam String prefix) {
        ProductDTO productDTO = objectMapper.readValue(data, ProductDTO.class);
        return productService.addProduct(productDTO, photo, prefix);
    }

    @GetMapping
    public HttpEntity<?> getProducts(@RequestParam(defaultValue = "") String name,
                                     @RequestParam(defaultValue = "1") Integer page,
                                     @RequestParam(defaultValue = "5") Integer size) {
        return productService.getProducts(name, page, size);
    }


    @SneakyThrows
    @PutMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public HttpEntity<?> editProduct(@Valid @RequestParam String data,
                                     @RequestParam(required = false) MultipartFile photo,
                                     @RequestParam String prefix) {
        ProductDTO productDTO = objectMapper.readValue(data, ProductDTO.class);
        System.out.println(productDTO);
        return productService.editProduct(productDTO, photo, prefix);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteProduct(@RequestParam UUID id, @RequestParam String attachmentName) {
        productService.deleteProduct(id,attachmentName);
    }
}
