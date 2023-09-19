package com.example.backend.service.carService;

import org.springframework.http.HttpEntity;

public interface CarService {
    HttpEntity<?> getCar();
}
