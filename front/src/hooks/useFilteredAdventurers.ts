import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "../api/api.ts";

interface Adventurer {
	id: number;
	name: string;
	experience: number;
	archetype: string;
	dailyRate: number;
	image?: string;
}

async function fetchAdventurers(): Promise<Adventurer[]> {
	return fetchData<Adventurer[]>("/adventurer");
}

export function useFilteredAdventurers() {
	const [searchParams] = useSearchParams();
	const searchTerm = searchParams.get("search") || "";
	const selectedArchetype = searchParams.get("archetype") || "";
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

	const uniqueArchetypes = query.data
		? Array.from(new Set(query.data.map((adv) => adv.archetype)))
		: [];

	return {
		adventurers: filteredAdventurers,
		archetypes: uniqueArchetypes,
		...query,
	};
}

export type { Adventurer };
