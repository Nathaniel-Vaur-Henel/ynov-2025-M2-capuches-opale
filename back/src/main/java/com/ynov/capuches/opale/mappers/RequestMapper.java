package com.ynov.capuches.opale.mappers;

import com.ynov.capuches.opale.entities.Request;
import com.ynov.capuches.opale.enums.Status;
import com.ynov.capuches.opale.model.RequestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface RequestMapper {
    Request toEntity(RequestDTO dto);
    RequestDTO toDTO(Request entity);


    RequestDTO.StatusEnum mapStatusEnum(Status status);



}
