package com.bintobloom.repository;

import com.bintobloom.model.Pickup;
import com.bintobloom.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PickupRepository extends JpaRepository<Pickup, Long> {
    List<Pickup> findByUser(User user);
    List<Pickup> findByCollector(User collector);
    List<Pickup> findByStatus(Pickup.PickupStatus status);
    
    Page<Pickup> findByUserOrderByScheduledDateTimeDesc(User user, Pageable pageable);
    
    @Query("SELECT p FROM Pickup p WHERE p.status = 'SCHEDULED' AND p.scheduledDateTime BETWEEN :start AND :end")
    List<Pickup> findScheduledPickupsBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    @Query("SELECT SUM(p.actualWeight) FROM Pickup p WHERE p.user = :user AND p.status = 'COMPLETED'")
    Double getTotalWasteCollectedByUser(@Param("user") User user);
    
    @Query("SELECT SUM(p.co2Saved) FROM Pickup p WHERE p.user = :user AND p.status = 'COMPLETED'")
    Double getTotalCo2SavedByUser(@Param("user") User user);
}
