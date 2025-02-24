package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.mappers.AdventurerMapper;
import com.ynov.capuches.opale.model.AdventurerDTO;
import com.ynov.capuches.opale.repositories.AdventurerRepository;
import org.springframework.stereotype.Service;

@Service
public class AdventurerService {
    private final AdventurerRepository adventurerRepository;
    private final AdventurerMapper adventurerMapper;

    public AdventurerService(AdventurerRepository adventurerRepository, AdventurerMapper adventurerMapper) {
        this.adventurerRepository = adventurerRepository;
        this.adventurerMapper = adventurerMapper;
    }

    public AdventurerDTO createAdventurer(AdventurerDTO adventurerDTO) {
        Adventurer adventurerEntity = adventurerMapper.toEntity(adventurerDTO);
        Adventurer savedAdventurer = this.adventurerRepository.save(adventurerEntity);
        return adventurerMapper.toDTO(savedAdventurer);
    }
}
