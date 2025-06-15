package com.keshavi.inventory.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.keshavi.inventory.entity.Category;
import com.keshavi.inventory.entity.Product;
import com.keshavi.inventory.entity.Transaction;
import com.keshavi.inventory.repository.CategoryRepository;
import com.keshavi.inventory.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TransactionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private Product product;

    @BeforeEach
    void setup() {
        // Ensure a product exists for the transaction
        Category category = new Category();
        category.setName("TestCat");
        category = categoryRepository.save(category);

        product = new Product();
        product.setName("TestProduct");
        product.setSku("SKU999");
        product.setPrice(50);
        product.setStockQuantity(10);
        product.setCategory(category);
        product = productRepository.save(product);
    }

    @Test
    @WithMockUser(username = "testuser", roles = {"USER"})
    void testCreateTransaction() throws Exception {
        Transaction transaction = new Transaction();
        transaction.setProduct(product);
        transaction.setQuantityChange(-2); // simulate a sale
        transaction.setType("SALE");
        transaction.setNote("Sold 2 units");

        mockMvc.perform(post("/api/transactions")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(transaction)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.type").value("SALE"));
    }
}
