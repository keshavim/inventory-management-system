package com.keshavi.inventory.service;

import com.keshavi.inventory.dto.StockReportDTO;
import com.keshavi.inventory.entity.Product;
import com.keshavi.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

/**
 * Service layer for managing products.
 * Handles business logic and interacts with the ProductRepository.
 */
@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product not found with id " + id));
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        product.setName(productDetails.getName());
        product.setSku(productDetails.getSku());
        product.setPrice(productDetails.getPrice());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setDescription(productDetails.getDescription());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    public List<StockReportDTO> getStockReport() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(p -> new StockReportDTO(
                        p.getId(),
                        p.getName(),
                        p.getSku(),
                        p.getStockQuantity(),
                        p.getCategory() != null ? p.getCategory().getName() : null
                ))
                .collect(Collectors.toList());
    }


}
