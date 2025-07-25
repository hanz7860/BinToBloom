package com.bintobloom.service;

import com.bintobloom.dto.PickupRequestDto;
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

@Service
@RequiredArgsConstructor
@Transactional
public class PickupService {
    private final PickupRepository pickupRepository;
    private final UserService userService;

    public Pickup schedulePickup(User user, PickupRequestDto requestDto) {
        Pickup pickup = new Pickup();
        pickup.setUser(user);
        pickup.setScheduledDateTime(requestDto.getScheduledDateTime());
        pickup.setAddress(requestDto.getAddress());
        pickup.setContactNumber(requestDto.getContactNumber());
        pickup.setSpecialInstructions(requestDto.getSpecialInstructions());
        pickup.setEstimatedWeight(requestDto.getEstimatedWeight());
        pickup.setStatus(Pickup.PickupStatus.SCHEDULED);

        return pickupRepository.save(pickup);
    }

    public Pickup assignCollector(Long pickupId, Long collectorId) {
        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() -> new RuntimeException("Pickup not found"));
        
        User collector = userService.findByUsername("collector")
                .orElseThrow(() -> new RuntimeException("Collector not found"));

        pickup.setCollector(collector);
        pickup.setStatus(Pickup.PickupStatus.IN_PROGRESS);

        return pickupRepository.save(pickup);
    }

    public Pickup completePickup(Long pickupId, Double actualWeight, String notes) {
        Pickup pickup = pickupRepository.findById(pickupId)
                .orElseThrow(() -> new RuntimeException("Pickup not found"));

        pickup.setActualWeight(actualWeight);
        pickup.setNotes(notes);
        pickup.setStatus(Pickup.PickupStatus.COMPLETED);

        // Calculate CO2 saved (assuming 1kg waste = 2.3kg CO2 saved)
        Double co2Saved = actualWeight * 2.3;
        pickup.setCo2Saved(co2Saved);

        // Calculate points earned (10 points per kg)
        Integer pointsEarned = (int) (actualWeight * 10);
        pickup.setPointsEarned(pointsEarned);

        Pickup savedPickup = pickupRepository.save(pickup);

        // Update user impact
        userService.updateUserImpact(pickup.getUser().getId(), actualWeight, co2Saved, pointsEarned);

        return savedPickup;
    }

    public List<Pickup> getUserPickups(User user) {
        return pickupRepository.findByUser(user);
    }

    public Page<Pickup> getUserPickupsPaginated(User user, Pageable pageable) {
        return pickupRepository.findByUserOrderByScheduledDateTimeDesc(user, pageable);
    }

    public List<Pickup> getScheduledPickups() {
        return pickupRepository.findByStatus(Pickup.PickupStatus.SCHEDULED);
    }

    public List<Pickup> getTodaysPickups() {
        LocalDateTime startOfDay = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        
        return pickupRepository.findScheduledPickupsBetween(startOfDay, endOfDay);
    }
}
