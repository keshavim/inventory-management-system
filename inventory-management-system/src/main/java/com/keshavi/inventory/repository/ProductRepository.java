package com.keshavi.inventory.repository;

import com.keshavi.inventory.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for Product entities.
 * Provides CRUD operations and query methods for products.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
    // You can add custom queries here later
}

