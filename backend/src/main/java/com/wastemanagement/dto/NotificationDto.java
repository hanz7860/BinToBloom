package com.wastemanagement.dto;

import com.wastemanagement.entity.Notification;

import java.time.LocalDateTime;

public class NotificationDto {
    private Long id;
    private Long userId;
    private String title;
    private String message;
    private Notification.Type type;
    private Boolean read;
    private Long pickupId;
    private LocalDateTime createdAt;

    // Constructors
    public NotificationDto() {}

    public NotificationDto(Notification notification) {
        this.id = notification.getId();
        this.userId = notification.getUser().getId();
        this.title = notification.getTitle();
        this.message = notification.getMessage();
        this.type = notification.getType();
        this.read = notification.getRead();
        this.pickupId = notification.getPickup() != null ? notification.getPickup().getId() : null;
        this.createdAt = notification.getCreatedAt();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Notification.Type getType() { return type; }
    public void setType(Notification.Type type) { this.type = type; }

    public Boolean getRead() { return read; }
    public void setRead(Boolean read) { this.read = read; }

    public Long getPickupId() { return pickupId; }
    public void setPickupId(Long pickupId) { this.pickupId = pickupId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
