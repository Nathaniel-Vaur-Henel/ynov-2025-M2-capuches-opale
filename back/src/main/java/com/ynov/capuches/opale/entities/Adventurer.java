package com.ynov.capuches.opale.entities;

import com.ynov.capuches.opale.enums.Archetype;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Adventurer {
    @Id
    private Long id;

    private String name;

    private Enum<Archetype> archetype;

    private Number experience = 0;

    private Double daily_rate = 0.0;
}
