package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"name", "brand_id"})
})
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;
    @ManyToOne
    private Brand brand;
    @OneToOne
    private Attachment photo;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean active;
}
