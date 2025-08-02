package com.wastemanagement.controller;

import com.wastemanagement.dto.PickupDto;
import com.wastemanagement.dto.PickupRequest;
import com.wastemanagement.service.PickupService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pickups")
@CrossOrigin(origins = "http://localhost:3000")
public class PickupController {

    @Autowired
    private PickupService pickupService;

    @PostMapping
    public ResponseEntity<PickupDto> schedulePickup(@Valid @RequestBody PickupRequest request) {
        try {
            PickupDto pickup = pickupService.schedulePickup(request);
            return ResponseEntity.ok(pickup);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<PickupDto>> getUserPickups() {
        try {
            List<PickupDto> pickups = pickupService.getUserPickups();
            return ResponseEntity.ok(pickups);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/available")
    public ResponseEntity<List<PickupDto>> getAvailablePickups(
            @RequestParam Double lat, 
            @RequestParam Double lng) {
        try {
            List<PickupDto> pickups = pickupService.getAvailablePickups(lat, lng);
            return ResponseEntity.ok(pickups);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<PickupDto> acceptPickup(@PathVariable Long id) {
        try {
            PickupDto pickup = pickupService.acceptPickup(id);
            return ResponseEntity.ok(pickup);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<PickupDto> updatePickupStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            PickupDto pickup = pickupService.updatePickupStatus(id, status);
            return ResponseEntity.ok(pickup);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
