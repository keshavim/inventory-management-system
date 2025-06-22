package com.keshavi.inventory.config;

import com.keshavi.inventory.entity.User;
import com.keshavi.inventory.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAdminUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("adminpassword")); // Set a secure password!
                admin.setRole(User.Role.ADMIN);
                userRepository.save(admin);
            }
        };
    }
    @Bean
    public CommandLineRunner initTestUser(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUsername("testuser")) {
                User user = new User();
                user.setUsername("testuser");
                user.setPassword(passwordEncoder.encode("testpassword")); // Set a secure password!
                user.setRole(User.Role.USER);
                userRepository.save(user);
            }
        };
    }
}
