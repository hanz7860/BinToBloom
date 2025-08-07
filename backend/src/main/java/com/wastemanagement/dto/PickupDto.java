package com.wastemanagement.dto;

import com.wastemanagement.entity.Location;
import com.wastemanagement.entity.Pickup;

import java.time.LocalDateTime;

public class PickupDto {
    private Long id;
    private Long donorId;
    private Long collectorId;
    private String wasteType;
    private Double quantity;
    private Location location;
    private LocalDateTime scheduledTime;
    private Pickup.Status status;
    private String notes;
    private LocalDateTime createdAt;
    private UserDto donor;
    private UserDto collector;

    // Constructors
    public PickupDto() {}

    public PickupDto(Pickup pickup) {
        this.id = pickup.getId();
        this.donorId = pickup.getDonor().getId();
        this.collectorId = pickup.getCollector() != null ? pickup.getCollector().getId() : null;
        this.wasteType = pickup.getWasteType();
        this.quantity = pickup.getQuantity();
        this.location = pickup.getLocation();
        this.scheduledTime = pickup.getScheduledTime();
        this.status = pickup.getStatus();
        this.notes = pickup.getNotes();
        this.createdAt = pickup.getCreatedAt();
        this.donor = new UserDto(pickup.getDonor());
        this.collector = pickup.getCollector() != null ? new UserDto(pickup.getCollector()) : null;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getDonorId() { return donorId; }
    public void setDonorId(Long donorId) { this.donorId = donorId; }

    public Long getCollectorId() { return collectorId; }
    public void setCollectorId(Long collectorId) { this.collectorId = collectorId; }

    public String getWasteType() { return wasteType; }
    public void setWasteType(String wasteType) { this.wasteType = wasteType; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }

    public Location getLocation() { return location; }
    public void setLocation(Location location) { this.location = location; }

    public LocalDateTime getScheduledTime() { return scheduledTime; }
    public void setScheduledTime(LocalDateTime scheduledTime) { this.scheduledTime = scheduledTime; }

    public Pickup.Status getStatus() { return status; }
    public void setStatus(Pickup.Status status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public UserDto getDonor() { return donor; }
    public void setDonor(UserDto donor) { this.donor = donor; }

    public UserDto getCollector() { return collector; }
    public void setCollector(UserDto collector) { this.collector = collector; }
}
