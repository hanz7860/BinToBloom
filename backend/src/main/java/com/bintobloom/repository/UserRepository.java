package com.bintobloom.repository;

import com.bintobloom.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    
    List<User> findByUserType(User.UserType userType);
    
    @Query("SELECT u FROM User u WHERE u.userType = 'HOUSEHOLD' OR u.userType = 'RESTAURANT' ORDER BY u.ecoPoints DESC")
    Page<User> findTopContributors(Pageable pageable);
    
    @Query("SELECT u FROM User u WHERE u.userType = 'COLLECTOR' AND u.status = 'ACTIVE'")
    List<User> findActiveCollectors();
}
