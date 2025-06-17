package com.keshavi.inventory.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockReportDTO {
    private Long id;
    private String name;
    private String sku;
    private Integer stockQuantity;
    private String categoryName;

    // Constructor
    public StockReportDTO(Long id, String name, String sku, Integer stockQuantity, String categoryName) {
        this.id = id;
        this.name = name;
        this.sku = sku;
        this.stockQuantity = stockQuantity;
        this.categoryName = categoryName;
    }

}
