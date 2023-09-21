package com.example.backend.service.carService;

import com.example.backend.dto.CarDTO;
import org.springframework.http.HttpEntity;
import org.springframework.web.multipart.MultipartFile;

public interface CarService {
    HttpEntity<?> getCar();

    HttpEntity<?> addCar(CarDTO carDTO, MultipartFile photo, String prefix);

    HttpEntity<?> editCar(CarDTO carDTO, MultipartFile photo, String prefix);
}
