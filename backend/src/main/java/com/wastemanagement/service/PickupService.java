package com.wastemanagement.service;

import com.wastemanagement.dto.PickupDto;
import com.wastemanagement.dto.PickupRequest;
import com.wastemanagement.entity.Notification;
import com.wastemanagement.entity.Pickup;
import com.wastemanagement.entity.User;
import com.wastemanagement.repository.PickupRepository;
import com.wastemanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PickupService {

    @Autowired
    private PickupRepository pickupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    public PickupDto schedulePickup(PickupRequest request) {
        User donor = getCurrentUser();
        
        if (donor.getRole() != User.Role.DONOR) {
            throw new RuntimeException("Only donors can schedule pickups");
        }

        Pickup pickup = new Pickup();
        pickup.setDonor(donor);
        pickup.setWasteType(request.getWasteType());
        pickup.setQuantity(request.getQuantity());
        pickup.setLocation(request.getLocation());
        pickup.setScheduledTime(request.getScheduledTime());
        pickup.setNotes(request.getNotes());
        pickup.setStatus(Pickup.Status.PENDING);

        Pickup savedPickup = pickupRepository.save(pickup);

        // Notify nearby collectors
        List<User> nearbyCollectors = userRepository.findCollectorsNearLocation(
            request.getLocation().getLatitude(),
            request.getLocation().getLongitude(),
            10.0, // 10km radius
            User.Role.COLLECTOR
        );

        for (User collector : nearbyCollectors) {
            notificationService.createNotification(
                collector,
                "New Pickup Available",
                "A new pickup request is available near your location: " + request.getWasteType() + " - " + request.getQuantity() + "kg",
                Notification.Type.PICKUP_REQUEST,
                savedPickup
            );
        }

        return new PickupDto(savedPickup);
    }

    public List<PickupDto> getUserPickups() {
        User user = getCurrentUser();
        List<Pickup> pickups = pickupRepository.findByUserOrderByCreatedAtDesc(user);
        return pickups.stream().map(PickupDto::new).collect(Collectors.toList());
    }

    public List<PickupDto> getAvailablePickups(Double latitude, Double longitude) {
        User collector = getCurrentUser();
        
        if (collector.getRole() != User.Role.COLLECTOR) {
            throw new RuntimeException("Only collectors can view available pickups");
        }

        List<Pickup> availablePickups = pickupRepository.findAvailablePickupsNearLocation(
            latitude, longitude, 10.0 // 10km radius
        );
        
        return availablePickups.stream().map(PickupDto::new).collect(Collectors.toList());
    }

    public PickupDto acceptPickup(Long pickupId) {
        User collector = getCurrentUser();
        
        if (collector.getRole() != User.Role.COLLECTOR) {
            throw new RuntimeException("Only collectors can accept pickups");
        }

        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() -> new RuntimeException("Pickup not found"));

        if (pickup.getStatus() != Pickup.Status.PENDING) {
            throw new RuntimeException("Pickup is not available for acceptance");
        }

        pickup.setCollector(collector);
        pickup.setStatus(Pickup.Status.ACCEPTED);
        Pickup savedPickup = pickupRepository.save(pickup);

        // Notify donor
        notificationService.createNotification(
            pickup.getDonor(),
            "Pickup Accepted",
            "Your pickup request has been accepted by " + collector.getName(),
            Notification.Type.PICKUP_ACCEPTED,
            savedPickup
        );

        return new PickupDto(savedPickup);
    }

    public PickupDto updatePickupStatus(Long pickupId, String status) {
        User collector = getCurrentUser();
        
        if (collector.getRole() != User.Role.COLLECTOR) {
            throw new RuntimeException("Only collectors can update pickup status");
        }

        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() -> new RuntimeException("Pickup not found"));

        if (!pickup.getCollector().getId().equals(collector.getId())) {
            throw new RuntimeException("You can only update your own pickups");
        }

        Pickup.Status newStatus = Pickup.Status.valueOf(status);
        pickup.setStatus(newStatus);
        Pickup savedPickup = pickupRepository.save(pickup);

        // Notify donor about status change
        String message = "";
        Notification.Type notificationType = Notification.Type.GENERAL;
        
        switch (newStatus) {
            case IN_PROGRESS:
                message = "Your pickup is now in progress. The collector is on the way!";
                break;
            case COMPLETED:
                message = "Your pickup has been completed successfully. Thank you for contributing to a greener environment!";
                notificationType = Notification.Type.PICKUP_COMPLETED;
                break;
            case CANCELLED:
                message = "Your pickup has been cancelled. Please reschedule if needed.";
                break;
        }

        if (!message.isEmpty()) {
            notificationService.createNotification(
                pickup.getDonor(),
                "Pickup Status Updated",
                message,
                notificationType,
                savedPickup
            );
        }

        return new PickupDto(savedPickup);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
