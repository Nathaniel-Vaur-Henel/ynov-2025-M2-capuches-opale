package com.ynov.capuches.opale.mappers;
import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.model.AdventurerCreationDTO;
import com.ynov.capuches.opale.model.AdventurerDTO;
import com.ynov.capuches.opale.model.AdventurerUpdateDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Mapper(componentModel = "spring")
public interface AdventurerMapper {

    @Named("calculateDailyRate")
    static BigDecimal calculateDailyRate(BigDecimal initialDailyRate, Long experience) {
        // initialDailyRate * (experience * 0.5 + 1)
        return initialDailyRate
                .multiply(BigDecimal.valueOf(Math.log10(experience) * 0.5 + 1))
                .setScale(2, RoundingMode.HALF_UP);
    }

    @Mapping(target = "dailyRate", expression =
            "java(AdventurerMapper.calculateDailyRate(entity.getInitialDailyRate(), entity.getExperience()))")
    AdventurerDTO entityToAdventurerDTO(Adventurer entity);

    @Mapping(target = "experience", constant = "1L")
    Adventurer adventurerCreationDTOToEntity(AdventurerCreationDTO dto);

    Adventurer adventurerUpdateDTOToEntity(AdventurerUpdateDTO dto);
}
