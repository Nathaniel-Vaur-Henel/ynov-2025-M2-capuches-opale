package com.ynov.capuches.opale.controllers;


import com.ynov.capuches.opale.model.AdventurerCreationDTO;
import com.ynov.capuches.opale.model.AdventurerResponseDTO;
import com.ynov.capuches.opale.openapi.api.AdventurerApiDelegate;
import com.ynov.capuches.opale.services.AdventurerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class AdventurerController implements AdventurerApiDelegate {
    private final AdventurerService adventurerService;

    public AdventurerController(AdventurerService adventurerService) {
        this.adventurerService = adventurerService;
    }

    @Override
    public ResponseEntity<AdventurerResponseDTO> createAdventurer(AdventurerCreationDTO adventurerCreationDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adventurerService.createAdventurer(adventurerCreationDTO));
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
    public ResponseEntity<List<AdventurerResponseDTO>> getAdventurers() {
        return new ResponseEntity<>(adventurerService.getAllAdventurers(), HttpStatus.OK);
    }

}
