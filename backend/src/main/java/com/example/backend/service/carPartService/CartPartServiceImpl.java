package com.example.backend.service.carPartService;

import com.example.backend.dto.CartPartDTO;
import com.example.backend.entity.Attachment;
import com.example.backend.entity.CarPart;
import com.example.backend.repository.AttachmentRepository;
import com.example.backend.repository.CarPartRepository;
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
public class CartPartServiceImpl implements CartPartService {
    private final CarPartRepository carPartRepository;
    private final AttachmentRepository attachmentRepository;

    @SneakyThrows
    @Override
    public HttpEntity<?> addCarPart(CartPartDTO cartPartDTO, MultipartFile photo, String prefix) {
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
        CarPart carPart = CarPart.builder()
                .name(cartPartDTO.getName())
                .photo(attachment)
                .createdAt(LocalDateTime.now())
                .updatedAt(null)
                .build();
        carPartRepository.save(carPart);
        return ResponseEntity.ok("CarPart saved successfully");
    }

    @SneakyThrows
    @Override
    public HttpEntity<?> editCarPart(CartPartDTO cartPartDTO, MultipartFile photo, String prefix) {

        CarPart existingCarPart = carPartRepository.findById(cartPartDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Customer category not found"));
        existingCarPart.setName(cartPartDTO.getName());
        if (photo != null && !photo.isEmpty()) {
            createFile(photo, existingCarPart);
        }
        existingCarPart.setUpdatedAt(LocalDateTime.now());
        carPartRepository.save(existingCarPart);
        return ResponseEntity.ok("CarPart is edited successfully");
    }

    @Override
    public HttpEntity<?> getCarParts(String name, Integer page, Integer size) {
        Pageable pageable;
        if (page != null && size == -1) {
            pageable = Pageable.unpaged();
        } else {
            size = (size != null && size > 0) ? size : 10;
            pageable = PageRequest.of(page - 1, size);
        }
        return ResponseEntity.ok(carPartRepository.findByNameContainingIgnoreCase(name, pageable));

    }

    private void createFile(MultipartFile photo, CarPart existingCarPart) throws IOException {
        UUID attaUuid = UUID.randomUUID();
        String fileName = attaUuid + "_" + photo.getOriginalFilename();
        String filePath = "backend/files/carPartPhotos/" + fileName;
        File file = new File(filePath);
        file.getParentFile().mkdirs();
        try (OutputStream outputStream = new FileOutputStream(file)) {
            FileCopyUtils.copy(photo.getInputStream(), outputStream);
        }
        existingCarPart.setPhoto(attachmentRepository.save(new Attachment(attaUuid, "/carPartPhotos", fileName)));
    }
}
