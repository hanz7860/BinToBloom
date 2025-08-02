package com.wastemanagement.dto;

import com.wastemanagement.entity.Location;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

public class PickupRequest {
    @NotBlank(message = "Waste type is required")
    private String wasteType;

    @NotNull(message = "Quantity is required")
    @Positive(message = "Quantity must be positive")
    private Double quantity;

    @Valid
    @NotNull(message = "Location is required")
    private Location location;

    @NotNull(message = "Scheduled time is required")
    private LocalDateTime scheduledTime;

    private String notes;

    // Constructors
    public PickupRequest() {}

    public PickupRequest(String wasteType, Double quantity, Location location, 
                        LocalDateTime scheduledTime, String notes) {
        this.wasteType = wasteType;
        this.quantity = quantity;
        this.location = location;
        this.scheduledTime = scheduledTime;
        this.notes = notes;
    }

    // Getters and Setters
    public String getWasteType() { return wasteType; }
    public void setWasteType(String wasteType) { this.wasteType = wasteType; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public LocalDateTime getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(LocalDateTime scheduledTime) { this.scheduledTime = scheduledTime; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
