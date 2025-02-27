import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

interface Adventurer {
	id: number;
	name: string;
	experience: number;
	archetype: string;
	dailyRate: number;
	image?: string;
}

async function fetchAdventurers(): Promise<Adventurer[]> {
	// Simuler une requête API - à remplacer par un vrai appel fetch plus tard
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					name: "Eldon le Brave",
					experience: 120,
					archetype: "Guerrier",
					dailyRate: 50,
				},
				{
					id: 2,
					name: "Lysara l'Érudite",
					experience: 450,
					archetype: "Mage",
					dailyRate: 75,
				},
				{
					id: 3,
					name: "Dorian l'Ombre",
					experience: 900,
					archetype: "Assassin",
					dailyRate: 100,
				},
				{
					id: 4,
					name: "Seraphine la Juste",
					experience: 1800,
					archetype: "Paladin",
					dailyRate: 125,
				},
				{
					id: 5,
					name: "Kael l'Œil Vif",
					experience: 2500,
					archetype: "Archer",
					dailyRate: 150,
				},
				{
					id: 6,
					name: "Thorian Marteau-Ardent",
					experience: 350,
					archetype: "Guerrier",
					dailyRate: 60,
				},
				{
					id: 7,
					name: "Elysia Voile-Céleste",
					experience: 1200,
					archetype: "Mage",
					dailyRate: 110,
				},
				{
					id: 8,
					name: "Vex Ombre-Lame",
					experience: 800,
					archetype: "Assassin",
					dailyRate: 90,
				},
			]);
		}, 1000);
	});
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
