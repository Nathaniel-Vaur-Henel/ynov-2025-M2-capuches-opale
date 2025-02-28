package com.ynov.capuches.opale.mappers;
import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.model.AdventurerCreationDTO;
import com.ynov.capuches.opale.model.AdventurerDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AdventurerMapper {

    @Mapping(target = "dailyRate", source = "initialDailyRate")
    AdventurerDTO entityToAdventurerDTO(Adventurer entity);

    @Mapping(target = "experience", constant = "0L")
    Adventurer adventurerCreationDTOToEntity(AdventurerCreationDTO dto);
}
