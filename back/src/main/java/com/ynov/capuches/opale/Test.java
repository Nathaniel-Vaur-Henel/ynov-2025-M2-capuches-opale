package com.ynov.capuches.opale;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class Test {
    public Test() {
      log.info("Ceci est un test 🐉");
      log.info("Maintenant, teste ta BDD http://localhost:8080/h2-console");
    }
}
