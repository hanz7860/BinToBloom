package com.bintobloom.service;

import com.bintobloom.dto.BadgeDto;
import com.bintobloom.model.Badge;
import com.bintobloom.model.User;
import com.bintobloom.model.UserBadge;
import com.bintobloom.repository.BadgeRepository;
import com.bintobloom.repository.UserBadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BadgeService {
    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;

    public void checkAndAwardBadges(User user) {
        List<Badge> allBadges = badgeRepository.findAll();
        
        for (Badge badge : allBadges) {
            if (!userBadgeRepository.existsByUserAndBadge(user, badge)) {
                if (isEligibleForBadge(user, badge)) {
                    awardBadge(user, badge);
                }
            }
        }
    }

    private boolean isEligibleForBadge(User user, Badge badge) {
        return switch (badge.getType()) {
            case WASTE_CHAMPION -> user.getTotalWasteCollected() >= 50.0;
            case REGULAR_CONTRIBUTOR -> user.getPickups().size() >= 10;
            case ECO_WARRIOR -> user.getEcoPoints() >= 1000;
            case COMMUNITY_HERO -> user.getEcoPoints() >= 2000;
            case ZERO_WASTE_HERO -> user.getTotalWasteCollected() >= 100.0;
        };
    }

    private void awardBadge(User user, Badge badge) {
        UserBadge userBadge = new UserBadge();
        userBadge.setUser(user);
        userBadge.setBadge(badge);
        userBadgeRepository.save(userBadge);
    }

    public List<BadgeDto> getUserBadges(User user) {
        List<UserBadge> userBadges = userBadgeRepository.findByUser(user);
        
        return userBadges.stream()
                .map(ub -> new BadgeDto(
                        ub.getBadge().getId(),
                        ub.getBadge().getName(),
                        ub.getBadge().getDescription(),
                        ub.getBadge().getIconUrl(),
                        ub.getEarnedAt()
                ))
                .toList();
    }
}
