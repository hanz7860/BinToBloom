package com.bintobloom.service;

import com.bintobloom.dto.PickupRequestDto;
import com.bintobloom.dto.PickupTrackingDto;
import com.bintobloom.model.Pickup;
import com.bintobloom.model.User;
import com.bintobloom.repository.PickupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PickupService {
    
    private final PickupRepository pickupRepository;
    private final UserService userService;

    public List<Pickup> getActivePickupsForUser(Long userId) {
        return pickupRepository.findByDonorIdAndStatusIn(userId, 
            List.of(Pickup.PickupStatus.SCHEDULED, Pickup.PickupStatus.ASSIGNED, Pickup.PickupStatus.IN_PROGRESS));
    }
    
    public PickupTrackingDto getPickupTracking(Long pickupId, Long userId) {
        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() -> new RuntimeException("Pickup not found"));
        
        // Verify user owns this pickup - using getDonor()
        if (!pickup.getDonor().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized access to pickup");
        }
        
        PickupTrackingDto.PickupTrackingDtoBuilder builder = PickupTrackingDto.builder()
                .pickupId(pickup.getId())
                .status(pickup.getStatus().toString())
                .scheduledDateTime(pickup.getScheduledDateTime())
                .estimatedWeight(pickup.getEstimatedWeight())
                .address(pickup.getAddress())
                .contactNumber(pickup.getContactNumber())
                .specialInstructions(pickup.getSpecialInstructions());
        
        if (pickup.getCollector() != null) {
            User collector = pickup.getCollector();
            builder.collectorName(collector.getFullName())
                   .collectorPhone(collector.getPhoneNumber())
                   .collectorRating(4.8) // This would come from a rating system
                   .currentLocation("2.5 km away") // This would come from GPS tracking
                   .distanceKm(2.5)
                   .estimatedArrival(LocalDateTime.now().plusMinutes(15)); // Calculated based on location
        }
        
        return builder.build();
    }
    
    public Page<Pickup> getUserPickupsPaginated(User user, Pageable pageable) {
        // Using findByDonorOrderByScheduledDateTimeDesc
        return pickupRepository.findByDonorOrderByScheduledDateTimeDesc(user, pageable);
    }
    
    public List<Pickup> getScheduledPickups() {
        return pickupRepository.findByStatus(Pickup.PickupStatus.SCHEDULED);
    }
    
    public List<Pickup> getTodaysPickups() {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        return pickupRepository.findScheduledPickupsBetween(startOfDay, endOfDay);
    }
    
    public Pickup schedulePickup(User donor, PickupRequestDto requestDto) {
        Pickup pickup = new Pickup();
        // Using setDonor()
        pickup.setDonor(donor);
        pickup.setScheduledDateTime(requestDto.getScheduledDateTime());
        pickup.setAddress(requestDto.getAddress());
        pickup.setContactNumber(requestDto.getContactNumber());
        pickup.setEstimatedWeight(requestDto.getEstimatedWeight());
        pickup.setSpecialInstructions(requestDto.getSpecialInstructions());
        pickup.setStatus(Pickup.PickupStatus.SCHEDULED);
        pickup.setCreatedAt(LocalDateTime.now());
        pickup.setUpdatedAt(LocalDateTime.now());
        
        return pickupRepository.save(pickup);
    }
    
    public Pickup assignCollector(Long pickupId, Long collectorId) {
        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() -> new RuntimeException("Pickup not found"));
        
        User collector = userService.findById(collectorId)
                .orElseThrow(() -> new RuntimeException("Collector not found"));
        
        pickup.setCollector(collector);
        pickup.setStatus(Pickup.PickupStatus.ASSIGNED);
        pickup.setUpdatedAt(LocalDateTime.now());
        
        return pickupRepository.save(pickup);
    }
    
    public Pickup completePickup(Long pickupId, Double actualWeight, String notes) {
        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() -> new RuntimeException("Pickup not found"));
        
        pickup.setActualWeight(actualWeight);
        pickup.setStatus(Pickup.PickupStatus.COMPLETED);
        pickup.setUpdatedAt(LocalDateTime.now());
        
        // Calculate impact
        double co2Saved = actualWeight * 0.3; // 1kg waste = 0.3kg CO2 saved
        int pointsEarned = (int) Math.round(actualWeight * 10); // 1kg = 10 points
        
        pickup.setCo2Saved(co2Saved);
        pickup.setPointsEarned(pointsEarned);
        
        // Update user impact - using getDonor()
        userService.updateUserImpact(pickup.getDonor().getId(), actualWeight, co2Saved, pointsEarned);
        
        return pickupRepository.save(pickup);
    }
}
