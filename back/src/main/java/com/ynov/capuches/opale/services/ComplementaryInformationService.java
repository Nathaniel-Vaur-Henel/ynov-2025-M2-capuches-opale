package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.ComplementaryInformation;
import com.ynov.capuches.opale.entities.Request;
import com.ynov.capuches.opale.exceptions.NotFoundException;
import com.ynov.capuches.opale.mappers.ComplementaryInformationMapper;
import com.ynov.capuches.opale.model.ComplementaryInformationDTO;
import com.ynov.capuches.opale.model.CreateComplementaryInformationDTO;
import com.ynov.capuches.opale.repositories.ComplementaryInformationRepository;
import com.ynov.capuches.opale.repositories.RequestRepository;
import com.ynov.capuches.opale.validator.EnumValidator;
import org.springframework.stereotype.Service;

@Service
public class ComplementaryInformationService {
    private final ComplementaryInformationRepository complementaryInformationRepository;
    private final ComplementaryInformationMapper complementaryInformationMapper;
    private final RequestRepository requestRepository;

    public ComplementaryInformationService(ComplementaryInformationRepository complementaryInformationRepository, ComplementaryInformationMapper complementaryInformationMapper, RequestRepository requestRepository) {
        this.complementaryInformationRepository = complementaryInformationRepository;
        this.complementaryInformationMapper = complementaryInformationMapper;
        this.requestRepository = requestRepository;
    }

    public ComplementaryInformationDTO createComplementaryInformation(Long requestId, CreateComplementaryInformationDTO createComplementaryInformationDTO) {

        Request request = requestRepository.findById(requestId)
                .orElseThrow(() -> new NotFoundException(requestId + " doesn't exist"));

        if (!EnumValidator.isValidArchetypesString(createComplementaryInformationDTO.getArchetypes())) {
            throw new IllegalArgumentException("Invalid archetypes: " + createComplementaryInformationDTO.getArchetypes());
        }

        if (request.getComplementaryInformation() == null) {
            ComplementaryInformation complementaryInformationEntity = complementaryInformationMapper.complementaryInformationDTOToEntity(createComplementaryInformationDTO);
            ComplementaryInformation savedComplementaryInformation = this.complementaryInformationRepository.save(complementaryInformationEntity);

            request.setComplementaryInformation(savedComplementaryInformation);
            requestRepository.save(request);

            return complementaryInformationMapper.entityToComplementaryInformationDTO(savedComplementaryInformation);
        }
        return complementaryInformationMapper.entityToComplementaryInformationDTO(request.getComplementaryInformation());
    }

    public ComplementaryInformationDTO getComplementaryInformation(Long id) {
        return complementaryInformationRepository.findById(id)
                .map(complementaryInformationMapper::entityToComplementaryInformationDTO)
                .orElse(null);
    }

}
