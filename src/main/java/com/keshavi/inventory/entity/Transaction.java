package com.keshavi.inventory.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "transactions")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false)
    private Integer quantityChange; // Positive for restock, negative for sale

    @Column(nullable = false)
    private String type; // "SALE", "RESTOCK", "ADJUSTMENT", etc.

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    private String note;

    // Getters and setters
}
