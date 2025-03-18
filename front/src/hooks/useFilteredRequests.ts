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
	// Appel réel à l'API backend
	try {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/request`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Erreur ${response.status}: ${response.statusText}`);
		}

		return response.json();
	} catch (error) {
		console.error("Erreur lors de la récupération des requêtes:", error);
		throw error;
	}
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
		staleTime: 60000, // 1 minute
		retry: 2,
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
