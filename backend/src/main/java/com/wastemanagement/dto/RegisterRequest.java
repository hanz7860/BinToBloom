package com.wastemanagement.dto;

import com.wastemanagement.entity.Location;
import com.wastemanagement.entity.User;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotNull(message = "Role is required")
    private User.Role role;

    @Valid
    @NotNull(message = "Location is required")
    private Location location;

    // Constructors
    public RegisterRequest() {}

    public RegisterRequest(String name, String email, String password, User.Role role, Location location) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.location = location;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public User.Role getRole() { return role; }
    public void setRole(User.Role role) { this.role = role; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }
}
