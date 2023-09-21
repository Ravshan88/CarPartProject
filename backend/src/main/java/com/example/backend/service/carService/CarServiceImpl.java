package com.example.backend.service.carService;

import com.example.backend.dto.CarDTO;
import com.example.backend.entity.*;
import com.example.backend.repository.AttachmentRepository;
import com.example.backend.repository.BrandRepository;
import com.example.backend.repository.CarPartRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
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
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {
    private final AttachmentRepository attachmentRepository;
    private final CarRepository carRepository;
    private final BrandRepository brandRepository;

    @Override
    public HttpEntity<?> getCar() {
        return ResponseEntity.ok(carRepository.findAll());
    }

    @SneakyThrows
    @Override
    public HttpEntity<?> addCar(CarDTO carDTO, MultipartFile photo, String prefix) {
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
        Optional<Brand> brand = brandRepository.findById(carDTO.getBrandId());
        if (brand.isPresent()) {
            Car car = Car.builder()
                    .name(carDTO.getName())
                    .photo(attachment)
                    .brand(brand.get())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(null)
                    .active(false)
                    .build();



            try {
                carRepository.save(car);
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Bunday Avtomobil mavjud!");
            }

            return ResponseEntity.ok("Car saved successfully");

        } else {
            return ResponseEntity.status(403).body("Brand not found");
        }
    }

    @SneakyThrows
    @Override
    public HttpEntity<?> editCar(CarDTO carDTO, MultipartFile photo, String prefix) {
        Car existingCar = carRepository.findById(carDTO.getId())
                .orElseThrow(() -> new EntityNotFoundException("Customer category not found"));
        existingCar.setName(carDTO.getName());
        if (photo != null && !photo.isEmpty()) {
            createFile(photo, existingCar);
        }
        existingCar.setUpdatedAt(LocalDateTime.now());


        try {
            carRepository.save(existingCar);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Bunday Avtomobil mavjud!");
        }

        return ResponseEntity.ok("CarPart is edited successfully");

    }

    @Override
    public HttpEntity<?> deleteCar(UUID id) {
        carRepository.deleteById(id);
        return ResponseEntity.ok("Muvaffaqiyatli o'chirildi!");
    }

    private void createFile(MultipartFile photo, Car existingCar) throws IOException {
        UUID attaUuid = UUID.randomUUID();
        String fileName = attaUuid + "_" + photo.getOriginalFilename();
        String filePath = "backend/files/carPhotos/" + fileName;
        File file = new File(filePath);
        file.getParentFile().mkdirs();
        try (OutputStream outputStream = new FileOutputStream(file)) {
            FileCopyUtils.copy(photo.getInputStream(), outputStream);
        }
        existingCar.setPhoto(attachmentRepository.save(new Attachment(attaUuid, "/carPhotos", fileName)));
    }

}
