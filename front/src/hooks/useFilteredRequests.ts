import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export interface Request {
	id: number;
	title: string;
	description: string;
	bounty: number;
	status:
		| "PENDING"
		| "REFUSED"
		| "ABANDONED"
		| "VALIDATED"
		| "FAILURE"
		| "SUCCESS";
	dueDate: string;
	backer: string;
}

async function fetchRequests(): Promise<Request[]> {
	// Simuler une requête API - à remplacer par un vrai appel fetch plus tard
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve([
				{
					id: 1,
					title: "Escorte de marchandises précieuses",
					description:
						"Protéger un convoi de marchandises rares entre Opale et Cristal",
					bounty: 300,
					status: "PENDING",
					dueDate: "2023-12-15",
					backer: "Guilde des Marchands",
				},
				{
					id: 2,
					title: "Élimination de gobelins",
					description: "Nettoyer une mine infestée de gobelins au sud d'Opale",
					bounty: 150,
					status: "VALIDATED",
					dueDate: "2023-11-30",
					backer: "Consortium Minier",
				},
				{
					id: 3,
					title: "Recherche d'artefact ancien",
					description:
						"Retrouver un artefact magique dans les ruines de l'ancien temple",
					bounty: 500,
					status: "SUCCESS",
					dueDate: "2023-10-20",
					backer: "Académie des Mages",
				},
				{
					id: 4,
					title: "Sauvetage d'un noble",
					description: "Secourir le fils d'un noble capturé par des bandits",
					bounty: 800,
					status: "FAILURE",
					dueDate: "2023-09-15",
					backer: "Maison Silverleaf",
				},
				{
					id: 5,
					title: "Chasse au monstre",
					description:
						"Traquer et éliminer une bête qui terrorise les villages",
					bounty: 450,
					status: "PENDING",
					dueDate: "2023-12-30",
					backer: "Alliance des Villages",
				},
				{
					id: 6,
					title: "Livraison urgente",
					description:
						"Livrer un colis important à travers un territoire dangereux",
					bounty: 200,
					status: "ABANDONED",
					dueDate: "2023-11-10",
					backer: "Messagers Royaux",
				},
				{
					id: 7,
					title: "Espionnage discret",
					description:
						"Infiltrer une réunion secrète et rapporter des informations",
					bounty: 600,
					status: "REFUSED",
					dueDate: "2023-12-05",
					backer: "Couronne d'Opale",
				},
				{
					id: 8,
					title: "Protection de site sacré",
					description: "Garder un site sacré pendant un rituel important",
					bounty: 350,
					status: "PENDING",
					dueDate: "2024-01-15",
					backer: "Ordre des Druides",
				},
			]);
		}, 1000);
	});
}

export function useFilteredRequests() {
	const [searchParams] = useSearchParams();
	const searchTerm = searchParams.get("search") || "";
	const selectedStatus = searchParams.get("status") || "";
	const sortField = searchParams.get("sort") as
		| "bounty"
		| "dueDate"
		| undefined;
	const sortDirection =
		(searchParams.get("direction") as "asc" | "desc") || "desc";

	const query = useQuery({
		queryKey: ["requests"],
		queryFn: fetchRequests,
	});

	const filteredRequests = query.data
		? query.data
				.filter((req) => {
					const matchesSearch = searchTerm
						? req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
						  req.description
								.toLowerCase()
								.includes(searchTerm.toLowerCase()) ||
						  req.backer.toLowerCase().includes(searchTerm.toLowerCase())
						: true;

					const matchesStatus = selectedStatus
						? req.status === selectedStatus
						: true;

					return matchesSearch && matchesStatus;
				})
				.sort((a, b) => {
					if (!sortField) return 0;

					if (sortField === "dueDate") {
						const dateA = new Date(a.dueDate).getTime();
						const dateB = new Date(b.dueDate).getTime();
						return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
					}

					const valueA = a[sortField];
					const valueB = b[sortField];

					if (sortDirection === "asc") {
						return valueA - valueB;
					} else {
						return valueB - valueA;
					}
				})
		: [];

	const uniqueStatuses = query.data
		? Array.from(new Set(query.data.map((req) => req.status)))
		: [];

	return {
		requests: filteredRequests,
		statuses: uniqueStatuses,
		...query,
	};
}
