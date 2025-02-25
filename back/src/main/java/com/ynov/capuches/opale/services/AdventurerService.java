package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.Adventurer;
import com.ynov.capuches.opale.repositories.AdventurerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AdventurerService {

    @Autowired
    private AdventurerRepository adventurerRepository;

    public List<Adventurer> getAllAdventurers() {
        return adventurerRepository.findAll();
    }
}
