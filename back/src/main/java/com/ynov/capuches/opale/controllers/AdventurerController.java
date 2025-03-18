package com.ynov.capuches.opale.controllers;


import com.ynov.capuches.opale.exceptions.NotFoundException;
import com.ynov.capuches.opale.model.AdventurerCreationDTO;
import com.ynov.capuches.opale.model.AdventurerResponseDTO;
import com.ynov.capuches.opale.model.AdventurerUpdateDTO;
import com.ynov.capuches.opale.openapi.api.AdventurerApiDelegate;
import com.ynov.capuches.opale.services.AdventurerService;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Controller
public class AdventurerController implements AdventurerApiDelegate {
    private final AdventurerService adventurerService;

    public AdventurerController(AdventurerService adventurerService) {
        this.adventurerService = adventurerService;
    }

    @Override
    public ResponseEntity<AdventurerResponseDTO> createAdventurer(AdventurerCreationDTO adventurerCreationDTO) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(adventurerService.createAdventurer(adventurerCreationDTO));
        } catch (BadRequestException e) {
            log.error(e.getMessage(), e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<AdventurerResponseDTO> getAdventurerById(Long id) {
        AdventurerResponseDTO adventurerDTO = adventurerService.getOneAdventurer(id);
        if (adventurerDTO != null) {
            return ResponseEntity.status(HttpStatus.OK).body(adventurerDTO);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @Override
    public ResponseEntity<List<AdventurerResponseDTO>> getAdventurers(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String archetype,
            @RequestParam(required = false) Integer experience,
            @RequestParam(required = false) BigDecimal dailyRate
    ) {
        Long experienceAsLong = (experience != null) ? experience.longValue() : null;

        List<AdventurerResponseDTO> adventurers = adventurerService.getFilteredAdventurers(name, archetype, experienceAsLong, dailyRate);
        return ResponseEntity.status(HttpStatus.OK).body(adventurers);
    }

    @Override
    public ResponseEntity<AdventurerResponseDTO> updateAdventurer(Long id, AdventurerUpdateDTO adventurerUpdateDTO) {
        try {
            return new ResponseEntity<>(adventurerService.updateAdventurer(id, adventurerUpdateDTO), HttpStatus.OK);
        } catch (Exception e) {
            if (e instanceof NotFoundException) {
                log.error(e.getMessage(), e);
            }
            return null;
        }
    }
}
