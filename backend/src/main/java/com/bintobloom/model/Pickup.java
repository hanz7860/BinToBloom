package com.bintobloom.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

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
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collector_id")
    private User collector;

    private LocalDateTime scheduledDateTime;

    private String address;

    private String contactNumber;

    private String specialInstructions;

    @Enumerated(EnumType.STRING)
    private PickupStatus status = PickupStatus.SCHEDULED;

    private Double estimatedWeight;

    private Double actualWeight;

    private Double co2Saved;

    private Integer pointsEarned;

    private String notes;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum PickupStatus {
        SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
    }
}
