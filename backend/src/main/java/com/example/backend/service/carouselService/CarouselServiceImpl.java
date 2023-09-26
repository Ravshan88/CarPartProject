package com.example.backend.service.carouselService;

import com.example.backend.entity.Attachment;
import com.example.backend.entity.CarouselPhoto;
import com.example.backend.repository.AttachmentRepository;
import com.example.backend.repository.CarouselPhotoRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CarouselServiceImpl implements CarouselService {
    private final CarouselPhotoRepository carouselPhotoRepository;
    private final AttachmentRepository attachmentRepository;

    @SneakyThrows
    @Override
    public HttpEntity<?> uploadCarousel(MultipartFile photo, String prefix) {
        Attachment attachment = Attachment.createAttachment(photo, prefix);
        Attachment savedAttachment = attachmentRepository.save(attachment);
        carouselPhotoRepository.save(new CarouselPhoto(savedAttachment, LocalDateTime.now()));
        return ResponseEntity.ok("Carousel is saved");
    }

    @Override
    public void deleteCarousel(UUID id, String attachmentId) {
        carouselPhotoRepository.deleteById(id);
        String folderPath = "backend/files/carouselPhotos/" + attachmentId;
        File fileToDelete = new File(folderPath);

        if (fileToDelete.exists()) {
            boolean delete = fileToDelete.delete();
        } else {
            System.err.println("File does not exist.");
        }
    }


    @Override
    public HttpEntity<?> getCarousel() {
        return ResponseEntity.ok(carouselPhotoRepository.findAll());
    }
}
