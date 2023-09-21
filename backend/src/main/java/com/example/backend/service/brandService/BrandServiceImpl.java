package com.example.backend.service.brandService;

import com.example.backend.dto.BrandDTO;
import com.example.backend.entity.Attachment;
import com.example.backend.entity.Brand;
import com.example.backend.repository.BrandRepository;
import com.example.backend.repository.AttachmentRepository;
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
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;
    private final AttachmentRepository attachmentRepository;

    @SneakyThrows
    @Override
    public HttpEntity<?> addBrand(BrandDTO brandDTO, MultipartFile photo, String prefix) {
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
        Brand brand = Brand.builder()
                .name(brandDTO.getName())
                .photo(attachment)
                .createdAt(LocalDateTime.now())
                .updatedAt(null)
                .build();


        try {
            brandRepository.save(brand);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Bunday Brand mavjud!");
        }

        return ResponseEntity.ok("Brand saved successfully");

    }

    @SneakyThrows
    @Override
    public HttpEntity<?> editBrand(BrandDTO brandDTO, MultipartFile photo, String prefix) {

        Brand existingBrand = brandRepository.findById(brandDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Customer category not found"));
        existingBrand.setName(brandDTO.getName());
        if (photo != null && !photo.isEmpty()) {
            System.out.println(photo);
            createFile(photo, existingBrand);
        }
        existingBrand.setUpdatedAt(LocalDateTime.now());



        try {
            brandRepository.save(existingBrand);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Bunday Brand mavjud!");
        }

        return ResponseEntity.ok("Brand is edited successfuly");
    }

    @Override
    public HttpEntity<?> getBrands(String name, Integer page, Integer size) {
        Pageable pageable;
        if (page != null && size == -1) {
            pageable = Pageable.unpaged();
        } else {
            size = (size != null && size > 0) ? size : 10;
            pageable = PageRequest.of(page - 1, size);
        }
        return ResponseEntity.ok(brandRepository.findByNameContainingIgnoreCase(name, pageable));

    }

    @Override
    public HttpEntity<?> deleteCarBrand(UUID id) {
        System.out.println(id);
        brandRepository.deleteById(id);
        return ResponseEntity.ok("Brand Muvaffaqiyatli o'chirildi!");
    }

    private void createFile(MultipartFile photo, Brand existingBrand) throws IOException {
        UUID attaUuid = UUID.randomUUID();
        String fileName = attaUuid + "_" + photo.getOriginalFilename();
        String filePath = "backend/files/brandPhotos/" + fileName;
        File file = new File(filePath);
        file.getParentFile().mkdirs();
        try (OutputStream outputStream = new FileOutputStream(file)) {
            FileCopyUtils.copy(photo.getInputStream(), outputStream);
        }
        existingBrand.setPhoto(attachmentRepository.save(new Attachment(attaUuid, "/brandPhotos", fileName)));
    }
}
