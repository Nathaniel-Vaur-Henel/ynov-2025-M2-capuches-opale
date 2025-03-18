package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.enums.Archetype;
import com.ynov.capuches.opale.exceptions.NotFoundException;
import com.ynov.capuches.opale.mappers.AdventurerMapper;
import com.ynov.capuches.opale.model.AdventurerCreationDTO;
import com.ynov.capuches.opale.model.AdventurerDTO;
import com.ynov.capuches.opale.model.AdventurerUpdateDTO;
import com.ynov.capuches.opale.model.ArchetypeEnum;
import com.ynov.capuches.opale.repositories.AdventurerRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AdventurerServiceTest {

    @InjectMocks
    private AdventurerService adventurerService;

    @Mock
    private AdventurerRepository adventurerRepository;

    @Mock
    private AdventurerMapper adventurerMapper;

    @Test
    public void canCreateAdventurer() {
        AdventurerCreationDTO adventurerCreationDTO = new AdventurerCreationDTO();
        adventurerCreationDTO.setName("string");
        adventurerCreationDTO.setArchetype(ArchetypeEnum.WARRIOR);
        adventurerCreationDTO.setInitialDailyRate(BigDecimal.TEN);

        Adventurer adventurer = new Adventurer(
                1L,"string", Archetype.WARRIOR, 1L, BigDecimal.TEN);

        AdventurerDTO adventurerDTO = new AdventurerDTO();
        adventurerDTO.setId(1L);
        adventurerDTO.setName("string");
        adventurerDTO.setArchetype(ArchetypeEnum.WARRIOR);
        adventurerDTO.setExperience(1L);
        adventurerDTO.setDailyRate(BigDecimal.TEN);

        given(adventurerMapper.adventurerCreationDTOToEntity(adventurerCreationDTO)).willReturn(adventurer);
        given(adventurerRepository.save(adventurer)).willReturn(adventurer);
        given(adventurerMapper.entityToAdventurerDTO(adventurer)).willReturn(adventurerDTO);
        AdventurerDTO adventurerSaved = this.adventurerService.createAdventurer(adventurerCreationDTO);

        assertNotNull(adventurerSaved);
        assertNotNull(adventurerSaved.getId());
        assertEquals(1L, adventurerSaved.getExperience());
    }

    @Test
    public void testGetAllAdventurers() {
        AdventurerDTO adventurerDTO = new AdventurerDTO();
        adventurerDTO.setId(1L);
        adventurerDTO.setName("string");
        adventurerDTO.setArchetype(ArchetypeEnum.WARRIOR);
        adventurerDTO.setExperience(1L);
        adventurerDTO.setDailyRate(BigDecimal.TEN);

        Adventurer adventurer = new Adventurer(
                1L,"string", Archetype.WARRIOR, 1L, BigDecimal.TEN);

        given(adventurerRepository.findAll()).willReturn(List.of(adventurer));
        given(adventurerMapper.entityToAdventurerDTO(adventurer)).willReturn(adventurerDTO);

        assertEquals(1L, this.adventurerService.getAllAdventurers().size());
    }

    @Test
    public void canGetAdventurer() {
        AdventurerDTO adventurerDTO = new AdventurerDTO();
        adventurerDTO.setId(1L);
        adventurerDTO.setName("string");
        adventurerDTO.setArchetype(ArchetypeEnum.WARRIOR);
        adventurerDTO.setExperience(1L);
        adventurerDTO.setDailyRate(BigDecimal.TEN);

        Optional<Adventurer> adventurer = Optional.of(
                new Adventurer(1L, "string", Archetype.WARRIOR, 1L, BigDecimal.TEN));

        given(adventurerRepository.findById(1L)).willReturn(adventurer);
        given(adventurerMapper.entityToAdventurerDTO(adventurer.get())).willReturn(adventurerDTO);
        AdventurerDTO adventurerGet = this.adventurerService.getOneAdventurer(1L);

        assertNotNull(adventurerGet);
        assertNotNull(adventurerGet.getId());
    }

    @Test
    public void canTGetAdventurer() {
        given(adventurerRepository.findById(1L)).willReturn(Optional.empty());
        AdventurerDTO adventurerGet = this.adventurerService.getOneAdventurer(1L);
        assertNull(adventurerGet);
    }

    @Test
    public void canUpdateAdventurer() {
        Long id = 1L;
        Adventurer existingAdventurer = new Adventurer(id, "Old Name", Archetype.WARRIOR, 10L, BigDecimal.TEN);

        AdventurerUpdateDTO updateDTO = new AdventurerUpdateDTO();
        updateDTO.setName("Updated Name");
        updateDTO.setExperience(20L);
        updateDTO.setArchetype(ArchetypeEnum.MAGE);

        Adventurer updatedAdventurer = new Adventurer(id, "Updated Name", Archetype.MAGE, 20L, BigDecimal.TEN);
        AdventurerDTO updatedAdventurerDTO = new AdventurerDTO();
        updatedAdventurerDTO.setId(id);
        updatedAdventurerDTO.setName("Updated Name");
        updatedAdventurerDTO.setArchetype(ArchetypeEnum.MAGE);
        updatedAdventurerDTO.setExperience(30L);
        updatedAdventurerDTO.setDailyRate(BigDecimal.TEN);

        given(adventurerRepository.findById(id)).willReturn(Optional.of(existingAdventurer));
        given(adventurerMapper.adventurerUpdateDTOToEntity(updateDTO)).willReturn(updatedAdventurer);
        given(adventurerMapper.entityToAdventurerDTO(refEq(updatedAdventurer))).willReturn(updatedAdventurerDTO);

        AdventurerDTO result = adventurerService.updateAdventurer(id, updateDTO);

        verify(adventurerMapper).entityToAdventurerDTO(refEq(updatedAdventurer));

        assertNotNull(result);
        assertEquals("Updated Name", result.getName());
        assertEquals(ArchetypeEnum.MAGE, result.getArchetype());
        assertEquals(30L, result.getExperience());
    }

    @Test
    public void updateAdventurer_ShouldThrowException_WhenNotFound() {
        Long id = 99L;
        AdventurerUpdateDTO updateDTO = new AdventurerUpdateDTO();
        updateDTO.setName("New Name");

        given(adventurerRepository.findById(id)).willReturn(Optional.empty());

        Exception exception = assertThrows(NotFoundException.class, () -> adventurerService.updateAdventurer(id, updateDTO));
        assertEquals("Adventurer not found", exception.getMessage());

        verify(adventurerRepository, never()).save(any());
        verify(adventurerMapper, never()).entityToAdventurerDTO(any());
    }
}
