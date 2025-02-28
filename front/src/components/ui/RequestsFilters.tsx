import {
	ArrowDownward as ArrowDownIcon,
	ArrowUpward as ArrowUpIcon,
	CalendarToday as CalendarIcon,
	ClearAll as ClearAllIcon,
	FilterList as FilterIcon,
	AttachMoney as MoneyIcon,
	Search as SearchIcon,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Chip,
	FormControl,
	Grid,
	InputAdornment,
	MenuItem,
	Select,
	Stack,
	TextField,
	alpha,
	useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type SortField = "bounty" | "dueDate" | "";
type SortDirection = "asc" | "desc";

interface RequestsFiltersProps {
	statuses: string[];
	count: number;
}

// Fonction pour traduire les statuts en français
const translateStatus = (status: string): string => {
	switch (status) {
		case "PENDING":
			return "En attente";
		case "VALIDATED":
			return "Validée";
		case "SUCCESS":
			return "Réussie";
		case "FAILURE":
			return "Échouée";
		case "REFUSED":
			return "Refusée";
		case "ABANDONED":
			return "Abandonnée";
		default:
			return status;
	}
};

export default function RequestsFilters({
	statuses,
	count,
}: RequestsFiltersProps) {
	const theme = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();

	// État local pour le debounce de recherche
	const [searchInputValue, setSearchInputValue] = useState(
		searchParams.get("search") || ""
	);

	// Récupération des paramètres d'URL
	const searchTerm = searchParams.get("search") || "";
	const selectedStatus = searchParams.get("status") || "";
	const sortField = (searchParams.get("sort") as SortField) || "";
	const sortDirection =
		(searchParams.get("direction") as SortDirection) || "desc";

	// Effet pour le debounce
	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchInputValue !== searchTerm) {
				if (searchInputValue) {
					searchParams.set("search", searchInputValue);
				} else {
					searchParams.delete("search");
				}
				setSearchParams(searchParams);
			}
		}, 300); // 300ms de délai pour le debounce

		return () => clearTimeout(timer);
	}, [searchInputValue, searchParams, searchTerm, setSearchParams]);

	// Fonctions pour mettre à jour les paramètres d'URL
	const updateSearch = (value: string) => {
		setSearchInputValue(value);
	};

	const updateStatus = (value: string) => {
		if (value) {
			searchParams.set("status", value);
		} else {
			searchParams.delete("status");
		}
		setSearchParams(searchParams);
	};

	const toggleSort = (field: SortField) => {
		if (sortField === field) {
			// Si même champ, changer la direction
			searchParams.set("direction", sortDirection === "asc" ? "desc" : "asc");
		} else {
			// Si nouveau champ, mettre à jour le champ et définir la direction par défaut
			searchParams.set("sort", field);
			searchParams.set("direction", "desc");
		}
		setSearchParams(searchParams);
	};

	const resetFilters = () => {
		setSearchInputValue("");
		setSearchParams({});
	};

	return (
		<Box>
			<Stack spacing={3}>
				<Grid container spacing={2}>
					{/* Champ de recherche */}
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							placeholder="Rechercher une requête..."
							value={searchInputValue}
							onChange={(e) => updateSearch(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon color="primary" />
									</InputAdornment>
								),
							}}
							sx={{
								borderRadius: 2,
								backgroundColor: alpha(theme.palette.background.default, 0.4),
								transition: "all 0.2s",
								"&:hover": {
									backgroundColor: alpha(theme.palette.background.default, 0.6),
								},
								"&.Mui-focused": {
									backgroundColor: alpha(theme.palette.background.default, 0.7),
									borderColor: theme.palette.primary.main,
									boxShadow: `0 0 0 2px ${alpha(
										theme.palette.primary.main,
										0.25
									)}`,
								},
							}}
						/>
					</Grid>

					{/* Sélecteur de statut */}
					<Grid item xs={12} md={6}>
						<FormControl fullWidth>
							<Select
								displayEmpty
								value={selectedStatus}
								onChange={(e) => updateStatus(e.target.value)}
								startAdornment={
									<InputAdornment position="start">
										<FilterIcon color="primary" />
									</InputAdornment>
								}
								sx={{
									borderRadius: 2,
									backgroundColor: alpha(theme.palette.background.default, 0.4),
									transition: "all 0.2s",
									"&:hover": {
										backgroundColor: alpha(
											theme.palette.background.default,
											0.6
										),
									},
									"&.Mui-focused": {
										backgroundColor: alpha(
											theme.palette.background.default,
											0.7
										),
										borderColor: theme.palette.primary.main,
										boxShadow: `0 0 0 2px ${alpha(
											theme.palette.primary.main,
											0.25
										)}`,
									},
								}}
							>
								<MenuItem value="">Tous les statuts</MenuItem>
								{statuses.map((status) => (
									<MenuItem key={status} value={status}>
										{translateStatus(status)}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Stack
					direction={{ xs: "column", sm: "row" }}
					spacing={2}
					justifyContent="space-between"
					alignItems={{ xs: "stretch", sm: "center" }}
				>
					{/* Boutons de tri */}
					<Stack
						direction="row"
						spacing={1.5}
						sx={{ flexGrow: 1, maxWidth: { sm: "60%" } }}
					>
						<Button
							variant={sortField === "bounty" ? "contained" : "outlined"}
							color="primary"
							onClick={() => toggleSort("bounty")}
							startIcon={<MoneyIcon />}
							endIcon={
								sortField === "bounty" &&
								(sortDirection === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />)
							}
							sx={{
								flex: 1,
								borderRadius: 2,
								transition: "all 0.2s ease",
								py: 1,
								...(sortField !== "bounty" && {
									borderColor: alpha(theme.palette.primary.main, 0.3),
									color: theme.palette.primary.light,
									"&:hover": {
										borderColor: theme.palette.primary.main,
										backgroundColor: alpha(theme.palette.primary.main, 0.08),
									},
								}),
							}}
						>
							Récompense
						</Button>
						<Button
							variant={sortField === "dueDate" ? "contained" : "outlined"}
							color="primary"
							onClick={() => toggleSort("dueDate")}
							startIcon={<CalendarIcon />}
							endIcon={
								sortField === "dueDate" &&
								(sortDirection === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />)
							}
							sx={{
								flex: 1,
								borderRadius: 2,
								transition: "all 0.2s ease",
								py: 1,
								...(sortField !== "dueDate" && {
									borderColor: alpha(theme.palette.primary.main, 0.3),
									color: theme.palette.primary.light,
									"&:hover": {
										borderColor: theme.palette.primary.main,
										backgroundColor: alpha(theme.palette.primary.main, 0.08),
									},
								}),
							}}
						>
							Échéance
						</Button>
					</Stack>

					{/* Réinitialiser et compteur */}
					<Stack
						direction="row"
						spacing={2}
						alignItems="center"
						justifyContent="flex-end"
						sx={{ flexGrow: 1 }}
					>
						{(searchTerm || selectedStatus || sortField) && (
							<Button
								variant="text"
								startIcon={<ClearAllIcon />}
								onClick={resetFilters}
								sx={{
									color: alpha(theme.palette.primary.light, 0.85),
									fontWeight: 500,
									"&:hover": {
										backgroundColor: alpha(theme.palette.primary.main, 0.08),
									},
								}}
							>
								Réinitialiser
							</Button>
						)}

						<Chip
							label={`${count} requête${count > 1 ? "s" : ""}`}
							variant="filled"
							sx={{
								backgroundColor: alpha(theme.palette.primary.main, 0.15),
								color: theme.palette.primary.light,
								fontWeight: 600,
								borderRadius: "8px",
								border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
								padding: "4px 2px",
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
}
