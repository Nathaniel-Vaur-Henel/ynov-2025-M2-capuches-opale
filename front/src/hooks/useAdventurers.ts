import { useQuery, useMutation, UseMutationResult } from "@tanstack/react-query";
import { fetchData, postData, putData, deleteData } from "../api/api.ts";

// 🔹 Définition du type des aventuriers
export interface Adventurer {
    id: number;
    name: string;
    experience: number;
    archetype: string;
    dailyRate: number;
    image?: string;
}

// 🔹 Fonctions d'appel API
async function fetchAdventurers(): Promise<Adventurer[]> {
    return fetchData<Adventurer[]>("/adventurer");
}

async function fetchAdventurer(id: number): Promise<Adventurer> {
    return fetchData<Adventurer>(`/adventurer/${id}`);
}

async function createAdventurer(adventurer: Omit<Adventurer, "id">): Promise<Adventurer> {
    return postData<Omit<Adventurer, "id">, Adventurer>("/adventurer", adventurer);
}

async function updateAdventurer(adventurer: Adventurer): Promise<Adventurer> {
    return putData<Adventurer>(`/adventurer/${adventurer.id}`, adventurer);
}

async function deleteAdventurer(id: number): Promise<void> {
    return deleteData(`/adventurer/${id}`); // ✅ Suppression du <void>
}

// 🔹 Hooks pour interagir avec l'API

/** 🔍 Récupère la liste de tous les aventuriers */
export function useAdventurers() {
    return useQuery<Adventurer[]>({
        queryKey: ["adventurers"],
        queryFn: fetchAdventurers,
        staleTime: 1000 * 60 * 5, 
        retry: 2, 
    });
}

/** 🔍 Récupère un aventurier spécifique par ID */
export function useAdventurer(id?: number) {
    return useQuery<Adventurer>({
        queryKey: ["adventurer", id],
        queryFn: () => {
            if (id === undefined) throw new Error("L'ID de l'aventurier est requis");
            return fetchAdventurer(id);
        },
        enabled: id !== undefined, 
        retry: 1, 
    });
}

/** ➕ Crée un nouvel aventurier */
export function useCreateAdventurer(): UseMutationResult<Adventurer, Error, Omit<Adventurer, "id">> {
    return useMutation({
        mutationFn: createAdventurer,
    });
}

/** ✏️ Met à jour un aventurier */
export function useUpdateAdventurer(): UseMutationResult<Adventurer, Error, Adventurer> {
    return useMutation({
        mutationFn: updateAdventurer,
    });
}

/** ❌ Supprime un aventurier */
export function useDeleteAdventurer(): UseMutationResult<void, Error, number> {
    return useMutation({
        mutationFn: deleteAdventurer,
    });
}