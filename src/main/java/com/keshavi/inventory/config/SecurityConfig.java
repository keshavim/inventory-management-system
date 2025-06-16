package com.keshavi.inventory.config;

import com.keshavi.inventory.repository.UserRepository;
import com.keshavi.inventory.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * SecurityConfig configures Spring Security for the application.
 *
 * - Disables CSRF for API-only usage.
 * - Configures endpoint security, allowing public access to registration and login.
 * - All other endpoints require authentication.
 * - Uses HTTP Basic authentication for simplicity (can be upgraded to JWT).
 * - Registers a BCrypt password encoder.
 * - Enables method-level security for role-based access.
 */
@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }

//    @Bean
//    public UserDetailsService userDetailsService(UserRepository userRepository) {
//        return new CustomUserDetailsService(userRepository);
//    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
    }


}
