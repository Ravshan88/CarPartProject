package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class ReqOrder {
    private String client_name;
    private String phone;
    private List<ReqOrderProduct> reqOrders;
    private double longitude;
    private double latitude;
}


