package com.example.backend.service.AttachmentService;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

public interface AttachmentService {
    HttpEntity<?> uploadFile(MultipartFile photo, String prefix) throws IOException;

    void getFile(HttpServletResponse response, UUID id) throws IOException;
}
