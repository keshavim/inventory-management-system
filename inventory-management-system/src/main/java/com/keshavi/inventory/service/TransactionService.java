package com.keshavi.inventory.service;

import com.keshavi.inventory.entity.Transaction;
import com.keshavi.inventory.entity.Product;
import com.keshavi.inventory.repository.TransactionRepository;
import com.keshavi.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service layer for managing inventory transactions.
 * Handles business logic for recording transactions and updating product stock.
 */
@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final ProductRepository productRepository;

    public TransactionService(TransactionRepository transactionRepository, ProductRepository productRepository) {
        this.transactionRepository = transactionRepository;
        this.productRepository = productRepository;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Transactional
    public Transaction createTransaction(Transaction transaction) {
        Product product = productRepository.findById(transaction.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Update product stock
        int newStock = product.getStockQuantity() + transaction.getQuantityChange();
        product.setStockQuantity(newStock);
        productRepository.save(product);

        return transactionRepository.save(transaction);
    }
}

