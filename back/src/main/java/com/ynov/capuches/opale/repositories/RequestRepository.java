package com.ynov.capuches.opale.repositories;

import com.ynov.capuches.opale.entities.Request;
import com.ynov.capuches.opale.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    Optional<Request> findByIdAndStatus(Long id, Status status);
}
