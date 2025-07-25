package com.bintobloom.controller;

import com.bintobloom.dto.PickupRequestDto;
import com.bintobloom.model.Pickup;
import com.bintobloom.model.User;
import com.bintobloom.service.PickupService;
import com.bintobloom.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pickups")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class PickupController {
    private final PickupService pickupService;
    private final UserService userService;

    @PostMapping("/schedule")
    public ResponseEntity<?> schedulePickup(
            @RequestParam Long userId,
            @Valid @RequestBody PickupRequestDto requestDto) {
        try {
            User user = userService.findByUsername("user")
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Pickup pickup = pickupService.schedulePickup(user, requestDto);
            return ResponseEntity.ok(pickup);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Pickup>> getUserPickups(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        User user = userService.findByUsername("user")
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Pickup> pickups = pickupService.getUserPickupsPaginated(user, pageable);
        
        return ResponseEntity.ok(pickups);
    }

    @GetMapping("/scheduled")
    public ResponseEntity<List<Pickup>> getScheduledPickups() {
        List<Pickup> pickups = pickupService.getScheduledPickups();
        return ResponseEntity.ok(pickups);
    }

    @GetMapping("/today")
    public ResponseEntity<List<Pickup>> getTodaysPickups() {
        List<Pickup> pickups = pickupService.getTodaysPickups();
        return ResponseEntity.ok(pickups);
    }

    @PutMapping("/{pickupId}/assign-collector")
    public ResponseEntity<?> assignCollector(
            @PathVariable Long pickupId,
            @RequestParam Long collectorId) {
        try {
            Pickup pickup = pickupService.assignCollector(pickupId, collectorId);
            return ResponseEntity.ok(pickup);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{pickupId}/complete")
    public ResponseEntity<?> completePickup(
            @PathVariable Long pickupId,
            @RequestParam Double actualWeight,
            @RequestParam(required = false) String notes) {
        try {
            Pickup pickup = pickupService.completePickup(pickupId, actualWeight, notes);
            return ResponseEntity.ok(pickup);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
