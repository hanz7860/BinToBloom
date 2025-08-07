package com.bintobloom.controller;

import com.bintobloom.dto.UserImpactDto;
import com.bintobloom.dto.LeaderboardDto;
import com.bintobloom.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private final UserService userService;

    @GetMapping("/{userId}/impact")
    public ResponseEntity<UserImpactDto> getUserImpact(@PathVariable Long userId) {
        UserImpactDto impact = userService.getUserImpact(userId);
        return ResponseEntity.ok(impact);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardDto>> getLeaderboard(
            @RequestParam(defaultValue = "10") int limit) {
        List<LeaderboardDto> leaderboard = userService.getLeaderboard(limit);
        return ResponseEntity.ok(leaderboard);
    }
}
