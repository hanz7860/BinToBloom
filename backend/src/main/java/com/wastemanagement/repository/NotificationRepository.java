package com.wastemanagement.repository;

import com.wastemanagement.entity.Notification;
import com.wastemanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
    
    List<Notification> findByUserAndReadOrderByCreatedAtDesc(User user, Boolean read);
    
    long countByUserAndRead(User user, Boolean read);
}
