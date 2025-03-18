package com.ynov.capuches.opale.repositories;

import com.ynov.capuches.opale.entities.ComplementaryInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplementaryInformationRepository extends JpaRepository<ComplementaryInformation, Long> {
}
