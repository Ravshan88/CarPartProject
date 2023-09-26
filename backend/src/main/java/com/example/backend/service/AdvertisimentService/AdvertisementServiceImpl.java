package com.example.backend.service.AdvertisimentService;

import com.example.backend.entity.Advertisement;
import com.example.backend.repository.AdvertisementRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AdvertisementServiceImpl implements AdvertisementService {

    private final AdvertisementRepository advertisementRepository;

    public AdvertisementServiceImpl(AdvertisementRepository advertisementRepository) {
        this.advertisementRepository = advertisementRepository;
    }

    @Override
    public HttpEntity<?> getAdvertisement() {
        return ResponseEntity.ok(advertisementRepository.findAll());
    }

    @Override
    public HttpEntity<?> addAdvertisement(Advertisement advertisement) {
        advertisementRepository.save(advertisement);
        return ResponseEntity.ok("Advertisement is saved");
    }

    @Override
    public HttpEntity<?> editAdvertisement(Advertisement advertisement) {
        System.out.println(advertisement);
        Advertisement currentAdvertisement = advertisementRepository.findById(advertisement.getId()).orElseThrow();
        currentAdvertisement.setId(advertisement.getId());
        currentAdvertisement.setTitle(advertisement.getTitle());
        advertisementRepository.save(advertisement);
        return ResponseEntity.ok("Advertisement edited");
    }

    @Override
    public HttpEntity<?> deleteAdvertisement(Integer id) {
        advertisementRepository.deleteById(id);
        return ResponseEntity.ok("Advertisement is deleted");
    }
}
