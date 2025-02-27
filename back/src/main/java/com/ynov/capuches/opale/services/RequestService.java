package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.Request;
import com.ynov.capuches.opale.mappers.RequestMapper;
import com.ynov.capuches.opale.model.RequestDTO;
import com.ynov.capuches.opale.repositories.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RequestService {

    private final RequestMapper requestMapper;
    private final RequestRepository requestRepository;

    public RequestService(RequestMapper requestMapper, RequestRepository requestRepository) {
        this.requestMapper = requestMapper;
        this.requestRepository = requestRepository;
    }

    public RequestDTO createRequest(RequestDTO requestDTO) {
        Request requestEntity = requestMapper.toEntity(requestDTO);
        Request savedRequest = this.requestRepository.save(requestEntity);
        return requestMapper.toDTO(savedRequest);
    }
}
