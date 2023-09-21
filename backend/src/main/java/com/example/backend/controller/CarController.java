package com.example.backend.controller;

import com.example.backend.dto.CarDTO;
import com.example.backend.service.carService.CarService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/car")
@RequiredArgsConstructor
public class CarController {
    private final CarService carService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @SneakyThrows
    @PostMapping
    public HttpEntity<?> addCarPart(@Valid @RequestParam String data,
                                    @RequestParam(required = false) MultipartFile photo,
                                    @RequestParam String prefix) {
        CarDTO carDTO = objectMapper.readValue(data, CarDTO.class);
        return carService.addCar(carDTO, photo, prefix);
    }

    @SneakyThrows
    @PutMapping
    public HttpEntity<?> editCar(@Valid @RequestParam String data,
                                 @RequestParam(required = false) MultipartFile photo,
                                 @RequestParam String prefix) {
        CarDTO carDTO = objectMapper.readValue(data, CarDTO.class);
        return carService.editCar(carDTO, photo, prefix);
    }

    @GetMapping
    public HttpEntity<?> getCar() {
        return carService.getCar();
    }
}
