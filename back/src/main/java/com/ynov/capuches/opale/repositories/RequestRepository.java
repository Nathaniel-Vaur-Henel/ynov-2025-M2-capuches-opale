package com.ynov.capuches.opale.repositories;

import com.ynov.capuches.opale.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

}
