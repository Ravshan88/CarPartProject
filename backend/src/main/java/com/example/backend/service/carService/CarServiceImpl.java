package com.example.backend.service.carService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {
    @Override
    public HttpEntity<?> getCar() {
        return null;
    }
}
