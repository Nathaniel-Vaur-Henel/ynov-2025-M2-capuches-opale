package com.ynov.capuches.opale.entities;

import com.ynov.capuches.opale.enums.Archetype;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Adventurer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Archetype archetype;

    private Long experience = 0L;

    private Double dailyRate = 0.0;
}
