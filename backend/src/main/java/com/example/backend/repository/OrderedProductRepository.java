package com.example.backend.repository;

import com.example.backend.entity.OrderedProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrderedProductRepository extends JpaRepository<OrderedProduct, UUID> {
//    List<OrderedProduct> findAllByOrder(UUID id);
    List<OrderedProduct>findOrderedProductsByOrders_Id(UUID orders_id);
}
