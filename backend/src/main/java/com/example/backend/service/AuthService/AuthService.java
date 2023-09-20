package com.example.backend.service.AuthService;


import com.example.backend.dto.UserDTO;
import com.example.backend.entity.User;
import com.example.backend.payload.ReqLogin;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface AuthService {
    HttpEntity<?> register(ReqLogin dto);
    HttpEntity<?> login(UserDTO dto);
    HttpEntity<?> refreshToken(String refreshToken);
    User decode(String token);

    HttpEntity<?> registerOperator(ReqLogin dto);

    HttpEntity<?> getOperator();

    HttpEntity<?> getAdmin();

    HttpEntity<?> deleteUser(UUID id);

    HttpEntity<?> updateUser(ReqLogin dto, UUID id);
}
