package com.ynov.capuches.opale.validator;

import com.ynov.capuches.opale.enums.Archetype;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class EnumValidator {
    public static boolean isValidArchetypesString(String archetypes) {
        if (archetypes == null || archetypes.isBlank()) {
            return false;
        }

        Set<String> validArchetypes = Arrays.stream(Archetype.values())
                .map(Enum::name)
                .collect(Collectors.toSet());

        List<String> archetypesList = Arrays.stream(archetypes.split(","))
                .map(String::trim)
                .collect(Collectors.toList());

        return archetypesList.stream().allMatch(validArchetypes::contains);
    }
}
