package com.keshavi.inventory.repository;

import com.keshavi.inventory.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // You can add custom queries here later
}

