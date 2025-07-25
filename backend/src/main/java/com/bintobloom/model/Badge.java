package com.bintobloom.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "badges")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Badge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String iconUrl;

    @Enumerated(EnumType.STRING)
    private BadgeType type;

    private Integer requiredPoints;

    private Double requiredWaste;

    private Integer requiredPickups;

    public enum BadgeType {
        WASTE_CHAMPION, REGULAR_CONTRIBUTOR, ECO_WARRIOR, COMMUNITY_HERO, ZERO_WASTE_HERO
    }
}
