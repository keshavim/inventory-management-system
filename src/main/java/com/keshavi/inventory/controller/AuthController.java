package com.keshavi.inventory.controller;

import com.keshavi.inventory.dto.RegisterRequest;
import com.keshavi.inventory.dto.LoginRequest;
import com.keshavi.inventory.entity.User;
import com.keshavi.inventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController handles user authentication endpoints.
 *
 * Endpoints:
 * - POST /api/auth/register: Registers a new user with a hashed password and USER role.
 * - POST /api/auth/login: Authenticates a user and returns login status.
 *
 * For demonstration, login returns a simple message.
 * In production, should return a JWT or session token.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return "Username already exists";
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.USER);
        userRepository.save(user);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid username or password";
        }
        // For now, just return a success message (JWT/session to be added in the next step)
        return "Login successful";
    }
}
