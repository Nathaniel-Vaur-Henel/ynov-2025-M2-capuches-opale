package com.ynov.capuches.opale.controllers;


import com.ynov.capuches.opale.model.AdventurerCreationDTO;
import com.ynov.capuches.opale.model.AdventurerDTO;
import com.ynov.capuches.opale.model.AdventurerUpdateDTO;
import com.ynov.capuches.opale.openapi.api.AdventurerApiDelegate;
import com.ynov.capuches.opale.services.AdventurerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@Slf4j
@Controller
public class AdventurerController implements AdventurerApiDelegate {
    private final AdventurerService adventurerService;

    public AdventurerController(AdventurerService adventurerService) {
        this.adventurerService = adventurerService;
    }

    @Override
    public ResponseEntity<AdventurerDTO> createAdventurer(AdventurerCreationDTO adventurerCreationDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adventurerService.createAdventurer(adventurerCreationDTO));
    }

    @Override
    public ResponseEntity<AdventurerDTO> getAdventurerById(Long id) {
        AdventurerDTO adventurerDTO = adventurerService.getOneAdventurer(id);
        if (adventurerDTO != null) {
            return ResponseEntity.status(HttpStatus.OK).body(adventurerDTO);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @Override
    public ResponseEntity<List<AdventurerDTO>> getAdventurers() {
        return new ResponseEntity<>(adventurerService.getAllAdventurers(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<AdventurerDTO> updateAdventurer(Long id, AdventurerUpdateDTO adventurerUpdateDTO) {
        try {
            return new ResponseEntity<>(adventurerService.updateAdventurer(id, adventurerUpdateDTO), HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return null;
    }
}
