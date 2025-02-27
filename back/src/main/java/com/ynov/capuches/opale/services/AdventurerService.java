package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.mappers.AdventurerMapper;
import com.ynov.capuches.opale.model.AdventurerDTO;
import com.ynov.capuches.opale.repositories.AdventurerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<AdventurerDTO> getAllAdventurers() {
        return adventurerRepository.findAll()
                .stream()
                .map(adventurerMapper::toDTO)
                .toList();
    }

    public AdventurerDTO getOneAdventurer(Long adventurerId) {
        Optional<AdventurerDTO> optionnalAdventurerDto = this.adventurerRepository.findById(adventurerId).map(adventurerMapper::toDTO);
        return optionnalAdventurerDto.orElse(null);
    }
}
