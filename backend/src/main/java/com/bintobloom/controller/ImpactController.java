package com.bintobloom.controller;

import com.bintobloom.model.ImpactMetrics;
import com.bintobloom.service.ImpactMetricsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/impact")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ImpactController {
    private final ImpactMetricsService impactMetricsService;

    @GetMapping("/global")
    public ResponseEntity<ImpactMetrics> getGlobalImpact() {
        ImpactMetrics metrics = impactMetricsService.getGlobalMetrics();
        return ResponseEntity.ok(metrics);
    }
}
