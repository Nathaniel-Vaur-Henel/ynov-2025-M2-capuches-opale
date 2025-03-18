package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.exceptions.NotFoundException;
import com.ynov.capuches.opale.mappers.AdventurerMapper;
import com.ynov.capuches.opale.model.AdventurerCreationDTO;
import com.ynov.capuches.opale.model.AdventurerResponseDTO;
import com.ynov.capuches.opale.model.AdventurerUpdateDTO;
import com.ynov.capuches.opale.repositories.AdventurerRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    public AdventurerResponseDTO createAdventurer(AdventurerCreationDTO adventurerCreationDTO) throws BadRequestException {
        if (adventurerCreationDTO.getArchetype() == null || adventurerCreationDTO.getName() == null ||
                adventurerCreationDTO.getInitialDailyRate() == null) {
            throw new BadRequestException("Must specify archetype, name and initial daily rate");
        } else if (adventurerCreationDTO.getInitialDailyRate().compareTo(BigDecimal.ONE) < 0) {
            throw new BadRequestException("The initial daily rate must be greater than 0");
        } else if (adventurerCreationDTO.getName().trim().length() < 5 ||
                adventurerCreationDTO.getName().trim().length() > 100) {
            throw new BadRequestException("The name should be between 5 and 100 characters");
        }

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

    public AdventurerResponseDTO updateAdventurer(Long id, AdventurerUpdateDTO adventurerUpdateDTO) {
        Adventurer adventurer = adventurerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Adventurer not found"));

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

        return adventurerMapper.entityToAdventurerResponseDTO(adventurer);
    }

    public List<AdventurerResponseDTO> getFilteredAdventurers(
            String nameFilter, String archetypeFilter, Long experienceFilter, BigDecimal dailyRateFilter) {
        return getAllAdventurers()
                .stream()
                .filter(adventurer -> nameFilter == null || adventurer.getName().equalsIgnoreCase(nameFilter))
                .filter(adventurer -> archetypeFilter == null || adventurer.getArchetype().name().equalsIgnoreCase(archetypeFilter))
                .filter(adventurer -> experienceFilter == null || adventurer.getExperience().equals(experienceFilter))
                .filter(adventurer -> dailyRateFilter == null || adventurer.getDailyRate().compareTo(dailyRateFilter) == 0)
                .toList();
    }

}
