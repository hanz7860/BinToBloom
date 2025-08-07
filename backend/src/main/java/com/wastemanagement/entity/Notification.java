package com.wastemanagement.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @NotBlank(message = "Message is required")
    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    @Column(name = "is_read", nullable = false)
    private Boolean read = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pickup_id")
    private Pickup pickup;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public enum Type {
        PICKUP_REQUEST, PICKUP_ACCEPTED, PICKUP_COMPLETED, GENERAL
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Constructors
    public Notification() {}

    public Notification(User user, String title, String message, Type type, Pickup pickup) {
        this.user = user;
        this.title = title;
        this.message = message;
        this.type = type;
        this.pickup = pickup;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public Type getType() { return type; }
    public void setType(Type type) { this.type = type; }

    public Boolean getRead() { return read; }
    public void setRead(Boolean read) { this.read = read; }

    public Pickup getPickup() { return pickup; }
    public void setPickup(Pickup pickup) { this.pickup = pickup; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
