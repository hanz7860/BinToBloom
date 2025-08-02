package com.bintobloom.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class LeaderboardDto {
    private Long userId;
    private String username;
    private String fullName;
    private Integer ecoPoints;
    private Double totalWasteCollected;
    private Integer rank;
}
