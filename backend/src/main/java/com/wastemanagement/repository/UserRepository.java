package com.wastemanagement.repository;

import com.wastemanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByRole(User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.role = :role AND " +
           "(:latitude IS NULL OR :longitude IS NULL OR " +
           "(6371 * acos(cos(radians(:latitude)) * cos(radians(u.location.latitude)) * " +
           "cos(radians(u.location.longitude) - radians(:longitude)) + " +
           "sin(radians(:latitude)) * sin(radians(u.location.latitude)))) <= :radius)")
    List<User> findCollectorsNearLocation(@Param("latitude") Double latitude, 
                                        @Param("longitude") Double longitude, 
                                        @Param("radius") Double radius, 
                                        @Param("role") User.Role role);
}
