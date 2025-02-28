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

import java.math.BigDecimal;
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
        requestDTO.setBounty(BigDecimal.ZERO);

        Request request = new Request(1L, "string", "string", BigDecimal.ZERO, Status.PENDING,
                LocalDate.parse("2025-05-05") ,"string");
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
        requestDTO.setBounty(BigDecimal.ZERO);

        Request request = new Request(1L, "string", "string", BigDecimal.ZERO, Status.PENDING,
                LocalDate.parse("2025-05-05") ,"string");

        given(requestRepository.findAll()).willReturn(List.of(request));
        given(requestMapper.toDTO(request)).willReturn(requestDTO);

        assertEquals(1, this.requestService.getAllRequests(null, null, null,null).size());
    }

    @Test
    public void getRequestsFiltered() {
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setBacker("string");
        requestDTO.setDescription("string");
        requestDTO.setId(1L);
        requestDTO.setDueDate(LocalDate.parse("2025-05-05"));
        requestDTO.setTitle("string");
        requestDTO.setStatus(RequestDTO.StatusEnum.PENDING);
        requestDTO.setBounty(BigDecimal.ZERO);

        Request request = new Request(1L, "string", "string", BigDecimal.ZERO, Status.PENDING, LocalDate.parse("2025-05-05") ,"string");
        given(requestRepository.findAll()).willReturn(List.of(request));
        given(requestMapper.toDTO(request)).willReturn(requestDTO);

        assertEquals(1, this.requestService.getAllRequests("PENDING", null, null,null).size());
        assertEquals(1, this.requestService.getAllRequests(null, "string", null,null).size());
        assertEquals(1, this.requestService.getAllRequests(null, null, LocalDate.parse("2025-05-05"),null).size());
        assertEquals(1, this.requestService.getAllRequests(null, null, null,BigDecimal.ZERO).size());
        assertEquals(1, this.requestService.getAllRequests("PENDING", "string", LocalDate.parse("2025-05-05"),BigDecimal.ZERO).size());
        assertEquals(0, this.requestService.getAllRequests("VALIDATED", null, null, null).size());
    }
    
    @Test
    public void canUpdateRequest() {
        RequestDTO requestDTO = new RequestDTO();
        requestDTO.setBacker("string");
        requestDTO.setDescription("string");
        requestDTO.setId(1L);
        requestDTO.setDueDate(LocalDate.parse("2025-05-05"));
        requestDTO.setTitle("string");
        requestDTO.setStatus(RequestDTO.StatusEnum.PENDING);
        requestDTO.setBounty(BigDecimal.ZERO);

        Request request = new Request(1L, "string", "string", BigDecimal.ZERO, Status.PENDING,
                LocalDate.parse("2025-05-05") ,"string");

        given(requestRepository.findByIdAndStatus(1L, Status.PENDING)).willReturn(java.util.Optional.of(request));;
        requestDTO.setTitle("title");
        requestDTO.setBacker("backer");
        requestDTO.setDueDate(LocalDate.parse("2025-08-05"));
        requestDTO.setBounty(BigDecimal.TEN);
        requestDTO.setStatus(RequestDTO.StatusEnum.PENDING);
        requestDTO.setDescription("description");

        Request requestToUpdate = new Request(1L, "title", "backer", BigDecimal.TEN, Status.PENDING,
                LocalDate.parse("2025-08-05") ,"description");
        given(requestMapper.toEntity(requestDTO)).willReturn(requestToUpdate);
        given(requestRepository.save(requestToUpdate)).willReturn(requestToUpdate);
        given(requestMapper.toDTO(requestToUpdate)).willReturn(requestDTO);
        RequestDTO requestSaved = this.requestService.updateRequest(requestDTO);

        assertNotNull(requestSaved);
        assertNotNull(requestSaved.getId());
    }
}
