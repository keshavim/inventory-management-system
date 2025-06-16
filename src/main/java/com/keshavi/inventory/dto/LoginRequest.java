package com.keshavi.inventory.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * LoginRequest is a Data Transfer Object for user login.
 *
 * Fields:
 * - username: The username of the user attempting to log in.
 * - password: The password of the user attempting to log in.
 */
@Getter
@Setter
public class LoginRequest {
    private String username;
    private String password;
}
