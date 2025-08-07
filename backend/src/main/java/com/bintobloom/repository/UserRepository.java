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

    boolean existsByUsername(String username);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByStatus(String status);

    List<User> findByEmailContaining(String infix);

    List<User> findByStatusNot(String status);

    List<User> findByStatusIn(List<String> statuses);

    @Query("SELECT u FROM User u ORDER BY u.ecoPoints DESC, u.totalWasteCollected DESC")
    Page<User> findTopContributors(Pageable pageable);

    // Corrected: Explicitly define the query for active collectors
    @Query("SELECT u FROM User u WHERE u.userType = 'COLLECTOR' AND u.status = 'ACTIVE'")
    List<User> findActiveCollectors();
}
