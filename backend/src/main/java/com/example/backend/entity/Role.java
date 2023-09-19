package com.example.backend.entity;

import com.example.backend.enums.UserRoles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Role implements GrantedAuthority {
    @Id
    private int id;

    @Column(unique = true, nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRoles name;

    @Override
    public String getAuthority() {
        return name.name();
    }
}
