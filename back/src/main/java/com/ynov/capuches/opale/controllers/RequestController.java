package com.ynov.capuches.opale.controllers;

import com.ynov.capuches.opale.exceptions.NotFoundException;
import com.ynov.capuches.opale.model.RequestDTO;
import com.ynov.capuches.opale.openapi.api.RequestApiDelegate;
import com.ynov.capuches.opale.services.RequestService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Controller
public class RequestController implements RequestApiDelegate {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @Override
    public ResponseEntity<RequestDTO> createRequest(RequestDTO requestDTO) {
        if (requestDTO == null || requestDTO.getDueDate() == null || requestDTO.getBacker() == null || requestDTO.getTitle() == null ) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        if (requestDTO.getStatus() == null) {
            requestDTO.setStatus(RequestDTO.StatusEnum.PENDING);
        }
        if (requestDTO.getBounty() == null) {
            requestDTO.setBounty(new BigDecimal(0));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(requestService.createRequest(requestDTO));
    }

    @Override
    public ResponseEntity<RequestDTO> updateRequest(RequestDTO requestDTO) {
        try {
            if (requestDTO == null || requestDTO.getId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            return ResponseEntity.status(HttpStatus.OK).body(requestService.updateRequest(requestDTO));
        }
        catch (NotFoundException e) {
            log.error(e.getMessage(),e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @Override
    public ResponseEntity<List<RequestDTO>> getRequests(
            String status,
            String backer,
            LocalDate dueDate,
            BigDecimal bounty
    ) {
        List<RequestDTO> requests = requestService.getAllRequests(status, backer, dueDate, bounty);
        return ResponseEntity.status(HttpStatus.OK).body(requests);
    }

}
