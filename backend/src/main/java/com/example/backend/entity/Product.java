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
    private double price;

    @OneToOne(cascade = CascadeType.REMOVE)
    private Attachment photo;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private CarPart carPart;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Car car;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean active;
}
