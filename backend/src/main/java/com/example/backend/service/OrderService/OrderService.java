package com.example.backend.service.OrderService;


import com.example.backend.dto.ReqOrder;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface OrderService {

    HttpEntity<?> getOrders(String status, Integer page, Integer size);

    HttpEntity<?> changeStatus(String status, UUID orderId);

    HttpEntity<?> saveOrder(ReqOrder reqOrder);
}
