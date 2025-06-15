package com.keshavi.inventory.repository;

import com.keshavi.inventory.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {}
