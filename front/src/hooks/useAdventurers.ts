import { useQuery } from "@tanstack/react-query";

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

export function useAdventurers() {
	return useQuery({
		queryKey: ["adventurers"],
		queryFn: fetchAdventurers,
	});
}

export type { Adventurer };
