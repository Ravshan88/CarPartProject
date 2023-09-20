package com.example.backend.repository;

import com.example.backend.entity.Role;
import com.example.backend.enums.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    List<Role> findAllByName(UserRoles name);

    Role findByName(UserRoles name);
}
