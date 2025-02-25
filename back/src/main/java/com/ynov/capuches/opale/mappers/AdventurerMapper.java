package com.ynov.capuches.opale.mappers;
import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.model.AdventurerDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AdventurerMapper {
    Adventurer toEntity(AdventurerDTO dto);
    AdventurerDTO toDTO(Adventurer entity);
}
