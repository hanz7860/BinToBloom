package com.wastemanagement.repository;

import com.wastemanagement.entity.Pickup;
import com.wastemanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PickupRepository extends JpaRepository<Pickup, Long> {
    List<Pickup> findByDonorOrderByCreatedAtDesc(User donor);
    
    List<Pickup> findByCollectorOrderByCreatedAtDesc(User collector);
    
    List<Pickup> findByStatus(Pickup.Status status);
    
    @Query("SELECT p FROM Pickup p WHERE p.status = 'PENDING' AND " +
           "(:latitude IS NULL OR :longitude IS NULL OR " +
           "(6371 * acos(cos(radians(:latitude)) * cos(radians(p.location.latitude)) * " +
           "cos(radians(p.location.longitude) - radians(:longitude)) + " +
           "sin(radians(:latitude)) * sin(radians(p.location.latitude)))) <= :radius) " +
           "ORDER BY p.createdAt DESC")
    List<Pickup> findAvailablePickupsNearLocation(@Param("latitude") Double latitude, 
                                                @Param("longitude") Double longitude, 
                                                @Param("radius") Double radius);
    
    @Query("SELECT p FROM Pickup p WHERE p.donor = :user OR p.collector = :user ORDER BY p.createdAt DESC")
    List<Pickup> findByUserOrderByCreatedAtDesc(@Param("user") User user);
}
