package com.example.backend.dto;

import com.example.backend.entity.Attachment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BrandDTO {
    private String name;
    private UUID photoId;
    private UUID id;
}