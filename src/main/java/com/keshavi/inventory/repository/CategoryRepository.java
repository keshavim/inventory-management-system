package com.keshavi.inventory.repository;

import com.keshavi.inventory.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for Category entities.
 * Provides CRUD operations and query methods for categories.
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {}
