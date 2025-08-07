package com.bintobloom.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PickupRequestDto {
    @NotNull(message = "Scheduled date and time is required")
    @Future(message = "Pickup must be scheduled for a future date")
    private LocalDateTime scheduledDateTime;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    private String specialInstructions;

    private Double estimatedWeight;
}
