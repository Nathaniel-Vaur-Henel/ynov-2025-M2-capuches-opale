package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.Request;
import com.ynov.capuches.opale.enums.Status;
import com.ynov.capuches.opale.mappers.RequestMapper;
import com.ynov.capuches.opale.model.RequestDTO;
import com.ynov.capuches.opale.repositories.RequestRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
public class RequestServiceTest {

    @InjectMocks
    private RequestService requestService;

    @Mock
    private RequestRepository requestRepository;

    @Mock
    private RequestMapper requestMapper;

    @Test
    public void canGenerateRequest() {
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setBacker("string");
        requestDTO.setDescription("string");
        requestDTO.setId(1L);
        requestDTO.setDueDate(LocalDate.parse("2025-05-05"));
        requestDTO.setTitle("string");
        requestDTO.setStatus(RequestDTO.StatusEnum.PENDING);
        requestDTO.setBounty(0.0f);

        Request request = new Request(1L, "string", "string", 0.0, Status.PENDING, LocalDate.parse("2025-05-05") ,"string");
        given(requestMapper.toEntity(requestDTO)).willReturn(request);
        given(requestRepository.save(request)).willReturn(request);
        given(requestMapper.toDTO(request)).willReturn(requestDTO);
        RequestDTO requestSaved = this.requestService.createRequest(requestDTO);

        assertNotNull(requestSaved);
        assertNotNull(requestSaved.getId());
    }

    @Test
    public void canGetAllRequests() {
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setBacker("string");
        requestDTO.setDescription("string");
        requestDTO.setId(1L);
        requestDTO.setDueDate(LocalDate.parse("2025-05-05"));
        requestDTO.setTitle("string");
        requestDTO.setStatus(RequestDTO.StatusEnum.PENDING);
        requestDTO.setBounty(0.0f);

        Request request = new Request(1L, "string", "string", 0.0, Status.PENDING, LocalDate.parse("2025-05-05") ,"string");

        given(requestRepository.findAll()).willReturn(List.of(request));
        given(requestMapper.toDTO(request)).willReturn(requestDTO);

        assertEquals(1, this.requestService.getAllRequests().size());
    }

}
