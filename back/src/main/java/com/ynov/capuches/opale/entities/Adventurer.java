package com.ynov.capuches.opale.entities;

import com.ynov.capuches.opale.enums.Archetype;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Adventurer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Archetype archetype;

    private Long experience = 0L;

    private BigDecimal initialDailyRate = BigDecimal.ZERO;
}
