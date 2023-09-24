package com.example.backend.service.productService;

import com.example.backend.dto.ProductDTO;
import com.example.backend.entity.*;
import com.example.backend.repository.AttachmentRepository;
import com.example.backend.repository.CarPartRepository;
import com.example.backend.repository.CarRepository;
import com.example.backend.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final AttachmentRepository attachmentRepository;
    private final CarPartRepository carPartRepository;
    private final CarRepository carRepository;

    @SneakyThrows
    @Override
    public HttpEntity<?> addProduct(ProductDTO productDTO, MultipartFile photo, String prefix) {
        Attachment attachment = null;
        if (photo != null && !photo.isEmpty()) {
            UUID id = UUID.randomUUID();
            String fileName = id + "_" + photo.getOriginalFilename();
            String filePath = "backend/files" + prefix + "/" + fileName;
            File file = new File(filePath);
            file.getParentFile().mkdirs();
            try (OutputStream outputStream = new FileOutputStream(file)) {
                FileCopyUtils.copy(photo.getInputStream(), outputStream);
            }
            attachment = new Attachment(id, prefix, fileName);
            attachmentRepository.save(attachment);
        }
        Product product = Product.builder()
                .name(productDTO.getName())
                .description(productDTO.getDescription())
                .photo(attachment)
                .carPart(productDTO.getCarPartId() == null ? null : carPartRepository.findById(productDTO.getCarPartId()).orElseThrow())
                .car(carRepository.findById(productDTO.getCarId()).orElseThrow())
                .createdAt(LocalDateTime.now())
                .updatedAt(null)
                .active(false)
                .build();
        try {
            productRepository.save(product);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Bunday mahsulot mavjud!");
        }
        return ResponseEntity.ok("Product saved successfully");


    }

    @Override
    public HttpEntity<?> getProducts(String name, Integer page, Integer size) {
        Pageable pageable = null;
        if (page != null && size == -1) {
            pageable = Pageable.unpaged();
        } else {
            size = (size != null && size > 0) ? size : 10;
            pageable = PageRequest.of(page - 1, size);
        }
        return ResponseEntity.ok(productRepository.findByNameContainingIgnoreCase(pageable, name));
    }

    @SneakyThrows
    @Override
    public HttpEntity<?> editProduct(ProductDTO productDTO, MultipartFile photo, String prefix) {
        Product existingProduct = productRepository.findById(productDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Mahsulot topilmadi"));
        existingProduct.setId(productDTO.getId());
        existingProduct.setName(productDTO.getName());
        existingProduct.setUpdatedAt(LocalDateTime.now());
        existingProduct.setCar(carRepository.findById(productDTO.getCarId()).orElseThrow());
        existingProduct.setDescription(productDTO.getDescription());
        existingProduct.setCarPart(carPartRepository.findById(productDTO.getCarPartId()).orElseThrow());
        if (photo != null && !photo.isEmpty()) {
            createFile(photo, existingProduct);
        }
        try {
            productRepository.save(existingProduct);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Bunday mahsulot mavjud!");
        }

        return ResponseEntity.ok("Product is edited successfully");
    }

    private void createFile(MultipartFile photo, Product existingProduct) throws IOException {
        UUID attaUuid = UUID.randomUUID();
        String fileName = attaUuid + "_" + photo.getOriginalFilename();
        String filePath = "backend/files/productPhotos/" + fileName;
        File file = new File(filePath);
        file.getParentFile().mkdirs();
        try (OutputStream outputStream = new FileOutputStream(file)) {
            FileCopyUtils.copy(photo.getInputStream(), outputStream);
        }
        existingProduct.setPhoto(attachmentRepository.save(new Attachment(attaUuid, "/productPhotos", fileName)));
    }
}