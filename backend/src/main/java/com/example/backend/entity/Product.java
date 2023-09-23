package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private String description;
    @OneToOne
    private Attachment photo;
    @OneToOne
    private CarPart carPart;
    @OneToOne
    private Car car;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean active;
}
