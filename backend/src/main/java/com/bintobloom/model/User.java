package com.bintobloom.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List; // Import List

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false)
    private UserType userType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;

    @Column(name = "eco_points")
    private Integer ecoPoints;

    @Column(name = "total_waste_collected")
    private Double totalWasteCollected;

    @Column(name = "total_co2_saved")
    private Double totalCo2Saved;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // Relationship with Pickups where this user is the donor
    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pickup> pickups; // Corrected mappedBy to "donor"

    // Relationship with Pickups where this user is the collector
    @OneToMany(mappedBy = "collector", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pickup> collectedPickups;

    public enum UserType {
        HOUSEHOLD, RESTAURANT, COLLECTOR, NGO
    }

    public enum UserStatus {
        ACTIVE, INACTIVE, SUSPENDED
    }
}
