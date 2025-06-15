package com.keshavi.inventory.repository;

import com.keshavi.inventory.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for Transaction entities.
 * Provides CRUD operations and query methods for transactions.
 */
public interface TransactionRepository extends JpaRepository<Transaction, Long> {}
