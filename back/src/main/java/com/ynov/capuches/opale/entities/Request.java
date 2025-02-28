package com.ynov.capuches.opale.entities;

import com.ynov.capuches.opale.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private BigDecimal bounty = new BigDecimal(0);

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    private LocalDate dueDate;
    private String backer;

}
