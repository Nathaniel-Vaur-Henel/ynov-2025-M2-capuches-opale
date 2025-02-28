package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.Request;
import com.ynov.capuches.opale.enums.Status;
import com.ynov.capuches.opale.exceptions.NotFoundException;
import com.ynov.capuches.opale.mappers.RequestMapper;
import com.ynov.capuches.opale.model.RequestDTO;
import com.ynov.capuches.opale.repositories.RequestRepository;
import org.springframework.stereotype.Service;
import static com.ynov.capuches.opale.mappers.RequestMapper.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


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

    public RequestDTO updateRequest(RequestDTO requestDTO) {
        Request existingRequest = requestRepository.findByIdAndStatus(requestDTO.getId(), Status.PENDING)
                .orElseThrow(() -> new NotFoundException("Id and request with status PENDING not found"));


        requestDTO.setTitle(requestDTO.getTitle() != null ? requestDTO.getTitle() : existingRequest.getTitle());
        requestDTO.setBacker(requestDTO.getBacker() != null ? requestDTO.getBacker() : existingRequest.getBacker());
        requestDTO.setDueDate(requestDTO.getDueDate() != null ? requestDTO.getDueDate() : existingRequest.getDueDate());
        requestDTO.setBounty(requestDTO.getBounty() != null ? requestDTO.getBounty() : existingRequest.getBounty());
        requestDTO.setStatus(requestDTO.getStatus() != null ? requestDTO.getStatus() : requestMapper.mapStatusEnum(existingRequest.getStatus()));
        requestDTO.setDescription(requestDTO.getDescription() != null ? requestDTO.getDescription() : existingRequest.getDescription());

        Request requestToUpdate = requestMapper.toEntity(requestDTO);
        Request updatedRequest = requestRepository.save(requestToUpdate);

        return requestMapper.toDTO(updatedRequest);

    }

    public List<RequestDTO> getAllRequests(String statusFilter, String backerFilter, LocalDate dueDateFilter, Float bountyFilter) {
        List<Request> requests = requestRepository.findAll();


        if (statusFilter != null) {
            Status statusEnum = Status.valueOf(statusFilter.toUpperCase());
            requests = requests.stream()
                    .filter(request -> request.getStatus() == statusEnum)
                    .toList();
        }

        if (backerFilter != null) {
            requests = requests.stream()
                    .filter(request -> request.getBacker().equalsIgnoreCase(backerFilter))
                    .toList();
        }

        if (dueDateFilter != null) {
            requests = requests.stream()
                    .filter(request -> request.getDueDate().equals(dueDateFilter))
                    .toList();
        }

        if (bountyFilter != null) {
            requests = requests.stream()
                    .filter(request -> request.getBounty().floatValue() == bountyFilter)
                    .toList();
        }

        return requests.stream()
                .map(requestMapper::toDTO)
                .toList();
    }
}
