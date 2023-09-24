package com.example.backend.repository;

import com.example.backend.entity.Orders;
import com.example.backend.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrdersRepository extends JpaRepository<Orders, UUID> {
    Page<Orders> findByStatusName(OrderStatus orderStatus, Pageable pageRequest);
//    List<Orders> findByStatusName(OrderStatus orderStatus, PageRequest of);
//    List<Orders> findByStatusName(OrderStatus orderStatus);
}
