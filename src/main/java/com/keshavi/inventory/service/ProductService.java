package com.keshavi.inventory.service;

import com.keshavi.inventory.entity.Product;
import com.keshavi.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Add more methods as needed (create, update, delete, etc.)
}
