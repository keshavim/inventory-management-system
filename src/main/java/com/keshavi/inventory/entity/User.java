package com.keshavi.inventory.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * The User entity represents an application user.
 *
 * Fields:
 * - id: Primary key, auto-generated.
 * - username: Unique username for login (required).
 * - password: Hashed password (required).
 * - role: User's role (USER or ADMIN).
 *
 * Example:
 * {
 *   "id": 1,
 *   "username": "johndoe",
 *   "password": "$2a$10$...",
 *   "role": "USER"
 * }
 */
@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    /**
     * The Role enum defines user roles for access control.
     * - USER: Standard customer, can register, log in, browse products, and place orders.
     * - ADMIN: Administrator, can manage products and view all orders.
     */
    public enum Role {
        USER,
        ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // Constructors
    public User() {}
    public User(String username, String password, Role role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }


}