package com.keshavi.inventory.repository;

import com.keshavi.inventory.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repository for User entity.
 *
 * Main methods:
 * - findByUsername(String username): Find a user by username.
 * - existsByUsername(String username): Check if a username is already taken.
 *
 * Example usage:
 *   Optional<User> user = userRepository.findByUsername("johndoe");
 *   boolean exists = userRepository.existsByUsername("johndoe");
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
}
