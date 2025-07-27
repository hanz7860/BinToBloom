package com.bintobloom.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PickupTrackingDto {
    private Long pickupId;
    private String status;
    private String collectorName;
    private String collectorPhone;
    private Double collectorRating;
    private LocalDateTime scheduledDateTime;
    private LocalDateTime estimatedArrival;
    private String currentLocation;
    private Double distanceKm;
    private String specialInstructions;
    private Double estimatedWeight;
    private String address;
    private String contactNumber;
}
