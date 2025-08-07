package com.bintobloom.service;

import com.bintobloom.model.ImpactMetrics;
import com.bintobloom.repository.ImpactMetricsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ImpactMetricsService {
    private final ImpactMetricsRepository impactMetricsRepository;

    public ImpactMetrics getGlobalMetrics() {
        return impactMetricsRepository.findAll()
                .stream()
                .findFirst()
                .orElse(createDefaultMetrics());
    }

    private ImpactMetrics createDefaultMetrics() {
        ImpactMetrics metrics = new ImpactMetrics();
        metrics.setTotalWasteCollected(2500.0);
        metrics.setTotalPesticideProduced(1200.0);
        metrics.setTotalPartnerNgos(45);
        metrics.setTotalAcresTreated(150.0);
        metrics.setTotalCo2Saved(5750.0);
        metrics.setTotalActiveUsers(1250);
        return impactMetricsRepository.save(metrics);
    }
}
