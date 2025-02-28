package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.mappers.AdventurerMapper;
import com.ynov.capuches.opale.model.AdventurerCreationDTO;
import com.ynov.capuches.opale.model.AdventurerDTO;
import com.ynov.capuches.opale.model.AdventurerUpdateDTO;
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

    public AdventurerDTO createAdventurer(AdventurerCreationDTO adventurerCreationDTO) {
        Adventurer adventurerEntity = adventurerMapper.adventurerCreationDTOToEntity(adventurerCreationDTO);
        Adventurer savedAdventurer = this.adventurerRepository.save(adventurerEntity);
        return adventurerMapper.entityToAdventurerDTO(savedAdventurer);
    }

    public List<AdventurerDTO> getAllAdventurers() {
        return adventurerRepository.findAll()
                .stream()
                .map(adventurerMapper::entityToAdventurerDTO)
                .toList();
    }

    public AdventurerDTO getOneAdventurer(Long adventurerId) {
        Optional<AdventurerDTO> optionnalAdventurerDto = this.adventurerRepository.findById(adventurerId).map(adventurerMapper::entityToAdventurerDTO);
        return optionnalAdventurerDto.orElse(null);
    }

    public AdventurerDTO updateAdventurer(Long id, AdventurerUpdateDTO adventurerUpdateDTO) {
        Adventurer adventurer = adventurerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Adventurer not found"));

        Adventurer adventurerUpdate = adventurerMapper.adventurerUpdateDTOToEntity(adventurerUpdateDTO);

        if (adventurerUpdate.getName() != null) {
            adventurer.setName(adventurerUpdate.getName());
        }

        if (adventurerUpdate.getExperience() != null) {
            adventurer.setExperience(adventurerUpdate.getExperience());
        }

        if (adventurerUpdate.getArchetype() != null) {
            adventurer.setArchetype(adventurerUpdate.getArchetype());
        }

        adventurerRepository.save(adventurer);

        return adventurerMapper.entityToAdventurerDTO(adventurer);
    }
}
