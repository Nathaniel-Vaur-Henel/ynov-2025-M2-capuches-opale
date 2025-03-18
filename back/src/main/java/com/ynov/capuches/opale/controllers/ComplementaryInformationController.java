package com.ynov.capuches.opale.controllers;

import com.ynov.capuches.opale.exceptions.NotFoundException;
import com.ynov.capuches.opale.model.ComplementaryInformationDTO;
import com.ynov.capuches.opale.model.CreateComplementaryInformationDTO;
import com.ynov.capuches.opale.openapi.api.ComplementaryInformationApiDelegate;
import com.ynov.capuches.opale.services.ComplementaryInformationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class ComplementaryInformationController implements ComplementaryInformationApiDelegate {
    private final ComplementaryInformationService complementaryInformationService;


    public ComplementaryInformationController(ComplementaryInformationService complementaryInformationService) {
        this.complementaryInformationService = complementaryInformationService;
    }

    @Override
    public ResponseEntity<ComplementaryInformationDTO> createComplementaryInformation(Long requestId, CreateComplementaryInformationDTO createComplementaryInformationDTO) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(complementaryInformationService.createComplementaryInformation(requestId, createComplementaryInformationDTO));
        } catch (NotFoundException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @Override
    public ResponseEntity<ComplementaryInformationDTO> getComplementaryInformation(Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(this.complementaryInformationService.getComplementaryInformation(id));
    }
}
