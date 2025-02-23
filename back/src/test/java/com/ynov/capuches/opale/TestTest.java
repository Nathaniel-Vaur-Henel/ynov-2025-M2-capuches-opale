package com.ynov.capuches.opale;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TestTest {

    @Test
    void test() {
        assertEquals(1, 1);
    }

    @Test
    @Disabled
    void fail() {
        assertEquals(1, 2);
    }
}