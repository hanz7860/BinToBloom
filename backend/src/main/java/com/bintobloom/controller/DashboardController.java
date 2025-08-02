package com.bintobloom.controller;

import com.bintobloom.config.JwtConfig;
import com.bintobloom.dto.UserImpactDto;
import com.bintobloom.dto.PickupTrackingDto;
import com.bintobloom.model.Pickup;
import com.bintobloom.model.User;
import com.bintobloom.service.UserService;
import com.bintobloom.service.PickupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://yourdomain.com"})
public class DashboardController {
    
    private final UserService userService;
    private final PickupService pickupService;
    private final JwtConfig jwtConfig;

    @GetMapping("/user-stats")
    public ResponseEntity<?> getUserStats(@RequestHeader("Authorization") String authHeader) {
        try {
            Long userId = getUserIdFromToken(authHeader);
            UserImpactDto impact = userService.getUserImpact(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", impact);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(createErrorResponse("Failed to fetch user stats: " + e.getMessage()));
        }
    }
    
    @GetMapping("/active-pickup")
    public ResponseEntity<?> getActivePickup(@RequestHeader("Authorization") String authHeader) {
        try {
            Long userId = getUserIdFromToken(authHeader);
            List<Pickup> activePickups = pickupService.getActivePickupsForUser(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", activePickups.isEmpty() ? null : activePickups.get(0));
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(createErrorResponse("Failed to fetch active pickup: " + e.getMessage()));
        }
    }
    
    @GetMapping("/pickup-history")
    public ResponseEntity<?> getPickupHistory(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Long userId = getUserIdFromToken(authHeader);
            User user = userService.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            var pickups = pickupService.getUserPickupsPaginated(user, 
                org.springframework.data.domain.PageRequest.of(page, size));
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", pickups);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(createErrorResponse("Failed to fetch pickup history: " + e.getMessage()));
        }
    }
    
    @GetMapping("/pickup-tracking/{pickupId}")
    public ResponseEntity<?> getPickupTracking(
            @PathVariable Long pickupId,
            @RequestHeader("Authorization") String authHeader) {
        try {
            Long userId = getUserIdFromToken(authHeader);
            PickupTrackingDto tracking = pickupService.getPickupTracking(pickupId, userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", tracking);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(createErrorResponse("Failed to fetch pickup tracking: " + e.getMessage()));
        }
    }
    
    private Long getUserIdFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Invalid token format");
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
