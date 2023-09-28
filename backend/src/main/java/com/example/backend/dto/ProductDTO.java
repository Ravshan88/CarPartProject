package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductDTO {
    private UUID id;
    private String name;
    private String description;
    private double price;
    private UUID carPartId;
    private UUID carId;
    private UUID photoId;
    private boolean active;
}
