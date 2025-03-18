package com.ynov.capuches.opale.mappers;
import com.ynov.capuches.opale.entities.ComplementaryInformation;
import com.ynov.capuches.opale.model.ComplementaryInformationDTO;
import com.ynov.capuches.opale.model.CreateComplementaryInformationDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ComplementaryInformationMapper {

    ComplementaryInformationDTO entityToComplementaryInformationDTO(ComplementaryInformation entity);

    ComplementaryInformation complementaryInformationDTOToEntity(CreateComplementaryInformationDTO dto);
}
