package com.ynov.capuches.opale.repositories;

import com.ynov.capuches.opale.entities.Adventurer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdventurerRepository extends JpaRepository<Adventurer, Long> {
}
