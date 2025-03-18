package com.ynov.capuches.opale.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComplementaryInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String archetypes;
    private int minAdventurerExperience;
    private int experiencePointsReward;

    @OneToOne(mappedBy = "complementaryInformation")
    private Request request;
}
