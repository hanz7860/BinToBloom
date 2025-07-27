package com.bintobloom.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pickups")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pickup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor; // Changed from 'user' to 'donor' for clarity and consistency

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collector_id")
    private User collector;

    @Column(name = "scheduled_date_time", nullable = false)
    private LocalDateTime scheduledDateTime;

    @Column(nullable = false)
    private String address;

    @Column(name = "contact_number", nullable = false)
    private String contactNumber;

    @Column(name = "estimated_weight")
    private Double estimatedWeight;

    @Column(name = "actual_weight")
    private Double actualWeight;

    @Column(name = "special_instructions", columnDefinition = "TEXT")
    private String specialInstructions;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PickupStatus status;

    @Column(name = "points_earned")
    private Integer pointsEarned;

    @Column(name = "co2_saved")
    private Double co2Saved;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public enum PickupStatus {
        SCHEDULED, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED
    }
}
