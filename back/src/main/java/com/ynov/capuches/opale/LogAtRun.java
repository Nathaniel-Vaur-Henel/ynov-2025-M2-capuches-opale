package com.ynov.capuches.opale;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class LogAtRun {
    public LogAtRun() {
      log.info("Maintenant, teste ta BDD http://localhost:8080/h2-console");
      log.info("Maintenant, teste ton contrat http://localhost:8080/swagger-ui/index.html");
    }
}
