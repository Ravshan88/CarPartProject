package com.example.backend.payload;

import com.example.backend.entity.OrderedProduct;
import com.example.backend.entity.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResOrders {
    private Orders order;
    private List<OrderedProduct> products;
}
