package com.bintobloom.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class BadgeDto {
    private Long id;
    private String name;
    private String description;
    private String iconUrl;
    private LocalDateTime earnedAt;
}
