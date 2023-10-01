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
                .price(productDTO.getPrice())
                .photo(attachment)
                .carPart(productDTO.getCarPartId() == null ? null : carPartRepository.findById(productDTO.getCarPartId()).orElseThrow())
                .car(carRepository.findById(productDTO.getCarId()).orElseThrow())
                .createdAt(LocalDateTime.now())
                .updatedAt(null)
                .active(false)
                .build();
        try {
            productRepository.save(product);
            return ResponseEntity.ok("Product saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Bunday mahsulot mavjud!");
        }
    }

    @Override
    public HttpEntity<?> getProducts(String name, Integer page, Integer size) {
        Pageable pageable = Pageable.unpaged();
//        if (page != null && size == -1) {
//            pageable = Pageable.unpaged();
//        } else {
//            size = (size != null && size > 0) ? size : 10;
//            pageable = PageRequest.of(page - 1, size);
//        }
        return ResponseEntity.ok(productRepository.findByNameContainingIgnoreCaseOrderByCreatedAt(pageable, name));
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
        existingProduct.setPrice(productDTO.getPrice());
        existingProduct.setCarPart(productDTO.getCarPartId() == null ? null : carPartRepository.findById(productDTO.getCarPartId()).orElseThrow());
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

    @Override
    public void deleteProduct(UUID id, String attachmentName) {
        System.out.println(attachmentName);
        productRepository.deleteById(id);
        String folderPath = "backend/files/productPhotos/" + attachmentName;
        File fileToDelete = new File(folderPath);
        if (fileToDelete.exists()) {
            boolean delete = fileToDelete.delete();
        } else {
            System.err.println("File does not exist.");
        }
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
