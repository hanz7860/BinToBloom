package com.wastemanagement.dto;

import com.wastemanagement.entity.Location;
import com.wastemanagement.entity.User;

public class UserDto {
    private Long id;
    private String name;
    private String email;
    private User.Role role;
    private Location location;

    // Constructors
    public UserDto() {}

    public UserDto(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
        this.location = user.getLocation();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public User.Role getRole() { return role; }
    public void setRole(User.Role role) { this.role = role; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }
}
