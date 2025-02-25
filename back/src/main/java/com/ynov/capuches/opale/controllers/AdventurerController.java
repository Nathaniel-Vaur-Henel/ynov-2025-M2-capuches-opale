package com.ynov.capuches.opale.controllers;

import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.services.AdventurerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/adventurers")
public class AdventurerController {

    @Autowired
    private AdventurerService adventurerService;

    @GetMapping
    public ResponseEntity<List<Adventurer>> getAllAdventurers() {
        try {   
            List<Adventurer> adventurers = adventurerService.getAllAdventurers();
            return ResponseEntity.ok(adventurers);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
