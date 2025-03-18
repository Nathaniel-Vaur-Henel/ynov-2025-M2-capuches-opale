import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../api/api.ts";
import Adventurer from "../types/Adventurer.ts";
import { Archetype } from "../utils/enum.ts";

async function fetchAdventurers(): Promise<Adventurer[]> {
	return fetchData<Adventurer[]>("/adventurer");
}

export function useFilteredAdventurers() {
	const [searchParams] = useSearchParams();
	const searchTerm = searchParams.get("search") || "";
	const selectedArchetype = searchParams.get("archetype") as Archetype | "";
	const sortField = searchParams.get("sort") as
		| "experience"
		| "dailyRate"
		| undefined;
	const sortDirection =
		(searchParams.get("direction") as "asc" | "desc") || "desc";

	const query = useQuery({
		queryKey: ["adventurers"],
		queryFn: fetchAdventurers,
	});

	const filteredAdventurers = query.data
		? query.data
				.filter((adv) => {
					const matchesSearch = searchTerm
						? adv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
						  adv.archetype.toLowerCase().includes(searchTerm.toLowerCase())
						: true;

					// Vérification avec l'Enum Archetype
					const matchesArchetype = selectedArchetype
						? adv.archetype === selectedArchetype
						: true;

					return matchesSearch && matchesArchetype;
				})
				.sort((a, b) => {
					if (!sortField) return 0;

					const valueA = a[sortField];
					const valueB = b[sortField];

					if (sortDirection === "asc") {
						return valueA - valueB;
					} else {
						return valueB - valueA;
					}
				})
		: [];

	// Générer la liste des archétypes en utilisant l'Enum Archetype
	const uniqueArchetypes = Object.values(Archetype);

	return {
		adventurers: filteredAdventurers,
		archetypes: uniqueArchetypes,
		...query,
	};
}
