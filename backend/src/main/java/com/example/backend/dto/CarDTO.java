package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CarDTO {
    private String name;
    private UUID brandId;
    private UUID photoId;
    private UUID id;
}
