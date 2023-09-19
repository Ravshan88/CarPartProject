package com.example.backend.service.AttachmentService;

import com.example.backend.entity.Attachment;
import com.example.backend.repository.AttachmentRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AttachmentServiceImpl implements AttachmentService {
    private final AttachmentRepository attachmentRepo;

    @Override
    public HttpEntity<?> uploadFile(MultipartFile photo, String prefix) throws IOException {
        UUID id = UUID.randomUUID();
        String fileName = id + "_" + photo.getOriginalFilename();
        String filePath = "backend/files" + prefix + "/" + fileName;

        File file = new File(filePath);
        file.getParentFile().mkdirs();

        try (OutputStream outputStream = new FileOutputStream(file)) {
            FileCopyUtils.copy(photo.getInputStream(), outputStream);
        }
        Attachment attachment = new Attachment(id, prefix, fileName);
        attachmentRepo.save(attachment);
        return ResponseEntity.ok(id);
    }


    @Override
    public void getFile(HttpServletResponse response, UUID id) throws IOException {
        Optional<Attachment> attachmentOptional = attachmentRepo.findById(id);
        if (attachmentOptional.isPresent()) {
            Attachment attachment = attachmentOptional.get();
            String prefix = attachment.getPrefix();
            String name = attachment.getName();
            String path = "backend/files" + prefix + "/" + name;
            FileCopyUtils.copy(new FileInputStream(path), response.getOutputStream());
        }
    }
}
