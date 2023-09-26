package com.example.backend.service.AdvertisimentService;

import com.example.backend.entity.Advertisement;
import org.springframework.http.HttpEntity;

public interface AdvertisementService {
    HttpEntity<?> getAdvertisement();

    HttpEntity<?> addAdvertisement(Advertisement advertisement);

    HttpEntity<?> editAdvertisement(Advertisement advertisement);

    HttpEntity<?> deleteAdvertisement(Integer id);
}
