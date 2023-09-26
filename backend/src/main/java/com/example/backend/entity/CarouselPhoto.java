package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CarouselPhoto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @OneToOne(cascade = CascadeType.REMOVE)
    private Attachment attachment;
    private LocalDateTime createdAt;

    public CarouselPhoto(Attachment attachment, LocalDateTime createdAt) {
        this.attachment = attachment;
        this.createdAt = createdAt;
    }
}
