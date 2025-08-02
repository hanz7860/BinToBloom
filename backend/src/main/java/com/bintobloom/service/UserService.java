package com.bintobloom.service;

import com.bintobloom.dto.UserRegistrationDto;
import com.bintobloom.dto.UserImpactDto;
import com.bintobloom.dto.LeaderboardDto;
import com.bintobloom.model.User;
import com.bintobloom.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BadgeService badgeService;

    public User registerUser(UserRegistrationDto registrationDto) {
        if (userRepository.existsByUsername(registrationDto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setFullName(registrationDto.getFullName());
        user.setPhoneNumber(registrationDto.getPhoneNumber());
        user.setAddress(registrationDto.getAddress());
        user.setUserType(registrationDto.getUserType());
        user.setStatus(User.UserStatus.ACTIVE);
        user.setEcoPoints(0);
        user.setTotalWasteCollected(0.0);
        user.setTotalCo2Saved(0.0);

        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUserImpact(Long userId, Double wasteCollected, Double co2Saved, Integer points) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setTotalWasteCollected(user.getTotalWasteCollected() + wasteCollected);
        user.setTotalCo2Saved(user.getTotalCo2Saved() + co2Saved);
        user.setEcoPoints(user.getEcoPoints() + points);

        User savedUser = userRepository.save(user);
        
        // Check for new badges
        badgeService.checkAndAwardBadges(savedUser);
        
        return savedUser;
    }

    public UserImpactDto getUserImpact(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<LeaderboardDto> leaderboard = getLeaderboard(100);
        int rank = IntStream.range(0, leaderboard.size())
                .filter(i -> leaderboard.get(i).getUserId().equals(userId))
                .findFirst()
                .orElse(-1) + 1;

        return new UserImpactDto(
                user.getTotalWasteCollected(),
                user.getTotalCo2Saved(),
                user.getEcoPoints(),
                user.getPickups() != null ? user.getPickups().size() : 0,
                badgeService.getUserBadges(user),
                rank
        );
    }

    public List<LeaderboardDto> getLeaderboard(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        Page<User> topUsers = userRepository.findTopContributors(pageable);
        
        return IntStream.range(0, topUsers.getContent().size())
                .mapToObj(i -> {
                    User user = topUsers.getContent().get(i);
                    return new LeaderboardDto(
                            user.getId(),
                            user.getUsername(),
                            user.getFullName(),
                            user.getEcoPoints(),
                            user.getTotalWasteCollected(),
                            i + 1
                    );
                })
                .toList();
    }

    public List<User> getActiveCollectors() {
        return userRepository.findActiveCollectors();
    }
}
