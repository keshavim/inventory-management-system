package com.keshavi.inventory.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * RegisterRequest is a Data Transfer Object for user registration.
 *
 * Fields:
 * - username: The desired username for the new user.
 * - password: The desired password for the new user.
 */
@Getter
@Setter
public class RegisterRequest {
    private String username;
    private String password;
}
