package com.bintobloom.repository;

import com.bintobloom.model.ImpactMetrics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImpactMetricsRepository extends JpaRepository<ImpactMetrics, Long> {
}
