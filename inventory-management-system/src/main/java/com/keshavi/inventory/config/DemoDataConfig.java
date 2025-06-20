package com.keshavi.inventory.config;

import com.keshavi.inventory.entity.Category;
import com.keshavi.inventory.entity.Product;
import com.keshavi.inventory.repository.CategoryRepository;
import com.keshavi.inventory.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Seeds the database with one category and one product at startup.
 */
@Configuration
public class DemoDataConfig {

    @Bean
    public CommandLineRunner addOneProduct(ProductRepository productRepository, CategoryRepository categoryRepository) {
        return args -> {
            // Check if the product already exists to avoid duplicates
            if (productRepository.findAll().isEmpty()) {
                // Create a category
                Category category = new Category();
                category.setName("Demo Category");
                category = categoryRepository.save(category);

                // Create a product
                Product product = new Product();
                product.setName("Demo Product");
                product.setSku("DEMO-001");
                product.setPrice(100);
                product.setQuantity(10);
                product.setDescription("This is a demo product.");
                product.setCategory(category);

                productRepository.save(product);

                System.out.println("Demo product and category added to the database.");
            }
        };
    }
}
