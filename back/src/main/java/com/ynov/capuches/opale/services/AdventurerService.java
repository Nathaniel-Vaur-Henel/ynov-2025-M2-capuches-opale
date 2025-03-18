package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.mappers.AdventurerMapper;
import com.ynov.capuches.opale.model.AdventurerCreationDTO;
import com.ynov.capuches.opale.model.AdventurerResponseDTO;
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

    public AdventurerResponseDTO createAdventurer(AdventurerCreationDTO adventurerCreationDTO) {
        Adventurer adventurerEntity = adventurerMapper.adventurerCreationDTOToEntity(adventurerCreationDTO);
        Adventurer savedAdventurer = this.adventurerRepository.save(adventurerEntity);
        return adventurerMapper.entityToAdventurerResponseDTO(savedAdventurer);
    }

    public List<AdventurerResponseDTO> getAllAdventurers() {
        return adventurerRepository.findAll()
                .stream()
                .map(adventurerMapper::entityToAdventurerResponseDTO)
                .toList();
    }

    public AdventurerResponseDTO getOneAdventurer(Long adventurerId) {
        Optional<AdventurerResponseDTO> optionalAdventurerDto = this.adventurerRepository.findById(adventurerId)
                .map(adventurerMapper::entityToAdventurerResponseDTO);
        return optionalAdventurerDto.orElse(null);
    }
}
