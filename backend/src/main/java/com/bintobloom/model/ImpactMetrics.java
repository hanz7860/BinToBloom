package com.bintobloom.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "impact_metrics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImpactMetrics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double totalWasteCollected = 0.0;

    private Double totalPesticideProduced = 0.0;

    private Integer totalPartnerNgos = 0;

    private Double totalAcresTreated = 0.0;

    private Double totalCo2Saved = 0.0;

    private Integer totalActiveUsers = 0;

    @UpdateTimestamp
    private LocalDateTime lastUpdated;
}
