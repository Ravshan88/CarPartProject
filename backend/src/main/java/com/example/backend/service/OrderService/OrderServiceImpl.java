package com.example.backend.service.OrderService;

import com.example.backend.dto.ReqOrder;
import com.example.backend.dto.ReqOrderProduct;
import com.example.backend.entity.OrderedProduct;
import com.example.backend.entity.Orders;
import com.example.backend.entity.Product;
import com.example.backend.entity.Status;
import com.example.backend.enums.OrderStatus;
import com.example.backend.payload.ResOrders;
import com.example.backend.repository.OrderedProductRepository;
import com.example.backend.repository.OrdersRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.StatusRepository;
import com.example.backend.service.OrderService.OrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrdersRepository ordersRepository;
    private final OrderedProductRepository orderedProductRepository;
    private final StatusRepository statusRepository;
    private final ProductRepository productRepository;

    @Override
    public HttpEntity<?> getOrders(String status, Integer page, Integer size) {
        Pageable pageRequest;
        if (page != null && size == -1) {
            pageRequest = Pageable.unpaged();
        } else {
            size = (size != null && size > 0) ? size : 10;
            pageRequest = PageRequest.of(page - 1, size);
        }

        Page<Orders> ordersPage;
        if (status != null && !status.isEmpty()) {
            OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            ordersPage = ordersRepository.findByStatusName(orderStatus, pageRequest);
        } else {
            ordersPage = ordersRepository.findAll(pageRequest);
        }

        Page<ResOrders> resOrdersPage = ordersPage.map(order -> {
            List<OrderedProduct> orderedProducts = orderedProductRepository.findOrderedProductsByOrders_Id(order.getId());
            return new ResOrders(order, orderedProducts);
        });

        return ResponseEntity.ok(resOrdersPage);
    }


    @Override
    public HttpEntity<?> changeStatus(String status, UUID orderId) {

        Orders currentOrder = ordersRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        status = status.toUpperCase();
        Integer newStatus = switch (status) {
            case "NEW" -> (currentOrder.getStatus().getName() == OrderStatus.NEW) ? 2 : null;
            case "INPROGRESS" -> (currentOrder.getStatus().getName() == OrderStatus.INPROGRESS) ? 3 : null;
            case "DECLINED" -> (currentOrder.getStatus().getName() == OrderStatus.NEW || currentOrder.getStatus().getName() == OrderStatus.INPROGRESS) ? 4 : null;
            default -> 4;
        };


        if (newStatus != null) {
            currentOrder.setStatus(statusRepository.findById(newStatus).orElseThrow());
            ordersRepository.save(currentOrder);
            return ResponseEntity.ok("Status updated successfully");
        } else {
            throw new RuntimeException("Invalid status change");
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> saveOrder(ReqOrder reqOrder) {
        try {
            Orders orders = new Orders();
            orders.setId(UUID.randomUUID());
            orders.setStatus(statusRepository.findById(1).orElseThrow());
            orders.setPhone_number(reqOrder.getPhone());
            orders.setClient_name(reqOrder.getClient_name());
            orders.setCreatedAt(LocalDateTime.now());
            orders.setLatitude(reqOrder.getLatitude());
            orders.setLongitude(reqOrder.getLongitude());
            Orders save = ordersRepository.save(orders);

            List<ReqOrderProduct> reqOrderProducts = reqOrder.getReqOrders();
            for (ReqOrderProduct reqOrderProduct : reqOrderProducts) {
                Product product = productRepository.findById(reqOrderProduct.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));  // Handle accordingly

                OrderedProduct orderedProduct = new OrderedProduct();
                orderedProduct.setOrders(save);
                orderedProduct.setProduct(product);
                orderedProduct.setCount(reqOrderProduct.getAmount());

                orderedProductRepository.save(orderedProduct);
            }

            return ResponseEntity.ok("Order saved successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error saving order");
        }
    }

}
