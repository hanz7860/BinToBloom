package com.bintobloom.repository;

import com.bintobloom.model.User;
import com.bintobloom.model.UserBadge;
import com.bintobloom.model.Badge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBadgeRepository extends JpaRepository<UserBadge, Long> {
    List<UserBadge> findByUser(User user);
    boolean existsByUserAndBadge(User user, Badge badge);
}
