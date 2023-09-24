package com.example.backend.entity;

import com.example.backend.enums.OrderStatus;
import com.example.backend.enums.UserRoles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Status {
    @Id
    private int id;
    @Column(unique = true, nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus name;

    public Status(OrderStatus name) {
        this.name = name;
    }

}
