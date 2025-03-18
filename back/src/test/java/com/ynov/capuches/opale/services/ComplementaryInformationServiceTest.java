package com.ynov.capuches.opale.services;

import com.ynov.capuches.opale.entities.ComplementaryInformation;
import com.ynov.capuches.opale.entities.Request;
import com.ynov.capuches.opale.exceptions.NotFoundException;
import com.ynov.capuches.opale.mappers.ComplementaryInformationMapper;
import com.ynov.capuches.opale.model.ComplementaryInformationDTO;
import com.ynov.capuches.opale.model.CreateComplementaryInformationDTO;
import com.ynov.capuches.opale.repositories.ComplementaryInformationRepository;
import com.ynov.capuches.opale.repositories.RequestRepository;
import com.ynov.capuches.opale.validator.EnumValidator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ComplementaryInformationServiceTest {

    @Mock
    private ComplementaryInformationRepository complementaryInformationRepository;

    @Mock
    private RequestRepository requestRepository;

    @Mock
    private ComplementaryInformationMapper complementaryInformationMapper;

    @InjectMocks
    private ComplementaryInformationService complementaryInformationService;

    private Request request;
    private ComplementaryInformation complementaryInformation;
    private ComplementaryInformationDTO complementaryInformationDTO;
    private CreateComplementaryInformationDTO createComplementaryInformationDTO;

    @BeforeEach
    void setUp() {
        request = new Request();
        request.setId(1L);

        complementaryInformation = new ComplementaryInformation();
        complementaryInformation.setId(1L);
        complementaryInformation.setArchetypes("MAGE,DRUID");

        complementaryInformationDTO = new ComplementaryInformationDTO();
        complementaryInformationDTO.setArchetypes("MAGE,DRUID");

        createComplementaryInformationDTO = new CreateComplementaryInformationDTO();
        createComplementaryInformationDTO.setArchetypes("MAGE,DRUID");
    }

    @Test
    void shouldCreateComplementaryInformationSuccessfully() {
        when(requestRepository.findById(1L)).thenReturn(Optional.of(request));
        when(complementaryInformationMapper.complementaryInformationDTOToEntity(createComplementaryInformationDTO)).thenReturn(complementaryInformation);
        when(complementaryInformationRepository.save(any(ComplementaryInformation.class))).thenReturn(complementaryInformation);
        when(complementaryInformationMapper.entityToComplementaryInformationDTO(complementaryInformation)).thenReturn(complementaryInformationDTO);

        try (MockedStatic<EnumValidator> mockedEnumValidator = mockStatic(EnumValidator.class)) {
            mockedEnumValidator.when(() -> EnumValidator.isValidArchetypesString("MAGE,DRUID")).thenReturn(true);

            ComplementaryInformationDTO result = complementaryInformationService.createComplementaryInformation(1L, createComplementaryInformationDTO);

            assertNotNull(result);
            assertEquals("MAGE,DRUID", result.getArchetypes());
            verify(complementaryInformationRepository, times(1)).save(any(ComplementaryInformation.class));
        }
    }

    @Test
    void shouldThrowNotFoundExceptionWhenRequestDoesNotExist() {
        when(requestRepository.findById(1L)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () ->
                complementaryInformationService.createComplementaryInformation(1L, createComplementaryInformationDTO)
        );

        assertEquals("1 doesn't exist", exception.getMessage());
    }

    @Test
    void shouldThrowIllegalArgumentExceptionForInvalidArchetypes() {
        when(requestRepository.findById(1L)).thenReturn(Optional.of(request));

        createComplementaryInformationDTO.setArchetypes("INVALID_TYPE");

        try (MockedStatic<EnumValidator> mockedEnumValidator = mockStatic(EnumValidator.class)) {
            mockedEnumValidator.when(() -> EnumValidator.isValidArchetypesString("INVALID_TYPE")).thenReturn(false);

            IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () ->
                    complementaryInformationService.createComplementaryInformation(1L, createComplementaryInformationDTO)
            );
            assertEquals("Invalid archetypes: INVALID_TYPE", exception.getMessage());
        }
    }

    @Test
    void shouldGetComplementaryInformationSuccessfully() {
        when(complementaryInformationRepository.findById(1L)).thenReturn(Optional.of(complementaryInformation));
        when(complementaryInformationMapper.entityToComplementaryInformationDTO(complementaryInformation)).thenReturn(complementaryInformationDTO);

        ComplementaryInformationDTO result = complementaryInformationService.getComplementaryInformation(1L);

        assertNotNull(result);
        assertEquals("MAGE,DRUID", result.getArchetypes());
    }

    @Test
    void shouldReturnNullWhenComplementaryInformationDoesNotExist() {
        when(complementaryInformationRepository.findById(1L)).thenReturn(Optional.empty());

        ComplementaryInformationDTO result = complementaryInformationService.getComplementaryInformation(1L);

        assertNull(result);
    }
}