package com.bintobloom.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
public class UserImpactDto {
    private Double totalWasteCollected;
    private Double totalCo2Saved;
    private Integer ecoPoints;
    private Integer totalPickups;
    private List<BadgeDto> badges;
    private Integer leaderboardRank;
}
