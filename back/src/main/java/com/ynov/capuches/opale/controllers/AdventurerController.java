package com.ynov.capuches.opale.controllers;


import com.ynov.capuches.opale.model.AdventurerDTO;
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
    public ResponseEntity<AdventurerDTO> createAdventurer(AdventurerDTO adventurerDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adventurerService.createAdventurer(adventurerDTO));
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

}
