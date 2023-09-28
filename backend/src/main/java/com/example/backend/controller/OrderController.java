package com.example.backend.controller;

import com.example.backend.dto.ReqOrder;
import com.example.backend.service.OrderService.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    public HttpEntity<?> getFilterCategory(
            @RequestParam(defaultValue = "") String status,
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "5") Integer size
    ) {
        return orderService.getOrders( status, page, size);
    }

    @PutMapping("/{orderId}")
    public HttpEntity<?>changeStatusOrder(
            @RequestParam(defaultValue = "") String status,
            @PathVariable UUID orderId
            ){
        return orderService.changeStatus(status, orderId);
    }

    @PostMapping
    public HttpEntity<?> saveOrder(@RequestBody ReqOrder reqOrder){
        return orderService.saveOrder(reqOrder);
    }
}
