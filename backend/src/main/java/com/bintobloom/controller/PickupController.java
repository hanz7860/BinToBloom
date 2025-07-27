package com.bintobloom.controller;

import com.bintobloom.config.JwtConfig; // Import JwtConfig
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
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/pickups")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://yourdomain.com"})
public class PickupController {
    
    private final PickupService pickupService;
    private final UserService userService;
    private final JwtConfig jwtConfig; // Inject JwtConfig

    @PostMapping("/schedule")
    public ResponseEntity<?> schedulePickup(
            @RequestHeader("Authorization") String authHeader, // Get Authorization header
            @Valid @RequestBody PickupRequestDto requestDto) {
        try {
            // Extract userId from JWT token
            Long userId = getUserIdFromToken(authHeader);
            
            User user = userService.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            // Verify user is active and allowed to schedule pickups
            if (user.getStatus() != User.UserStatus.ACTIVE) {
                return ResponseEntity.badRequest().body(createErrorResponse("User account is not active"));
            }
            
            if (user.getUserType() != User.UserType.HOUSEHOLD && 
                user.getUserType() != User.UserType.RESTAURANT) {
                return ResponseEntity.badRequest().body(createErrorResponse("Only households and restaurants can schedule pickups"));
            }
            
            Pickup pickup = pickupService.schedulePickup(user, requestDto);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Pickup scheduled successfully");
            response.put("pickup", pickup);
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(createErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(createErrorResponse("Authentication required or invalid token: " + e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserPickups(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            User user = userService.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            Pageable pageable = PageRequest.of(page, size);
            Page<Pickup> pickups = pickupService.getUserPickupsPaginated(user, pageable);
            
            return ResponseEntity.ok(pickups);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(createErrorResponse(e.getMessage()));
        }
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
            User collector = userService.findById(collectorId)
                    .orElseThrow(() -> new RuntimeException("Collector not found"));
            
            if (collector.getUserType() != User.UserType.COLLECTOR) {
                return ResponseEntity.badRequest().body(createErrorResponse("User is not a collector"));
            }
            
            Pickup pickup = pickupService.assignCollector(pickupId, collectorId);
            return ResponseEntity.ok(pickup);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(createErrorResponse(e.getMessage()));
        }
    }

    @PutMapping("/{pickupId}/complete")
    public ResponseEntity<?> completePickup(
            @PathVariable Long pickupId,
            @RequestParam Double actualWeight,
            @RequestParam(required = false) String notes) {
        try {
            Pickup pickup = pickupService.completePickup(pickupId, actualWeight, notes);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Pickup completed successfully");
            response.put("pickup", pickup);
            response.put("pointsEarned", pickup.getPointsEarned());
            response.put("co2Saved", pickup.getCo2Saved());
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(createErrorResponse(e.getMessage()));
        }
    }
    
    // Helper method to extract userId from Authorization header
    private Long getUserIdFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid token format or missing Authorization header.");
        }
        String token = authHeader.substring(7);
        return jwtConfig.getUserIdFromToken(token);
    }

    private Map<String, Object> createErrorResponse(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", false);
        response.put("message", message);
        return response;
    }
}
