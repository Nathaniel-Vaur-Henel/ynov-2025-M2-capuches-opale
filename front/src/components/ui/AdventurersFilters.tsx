import {
	ArrowDownward as ArrowDownIcon,
	ArrowUpward as ArrowUpIcon,
	ClearAll as ClearAllIcon,
	EuroSymbol as EuroIcon,
	FilterList as FilterIcon,
	Search as SearchIcon,
	Star as StarIcon,
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
	Typography,
	alpha,
	useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type SortField = "experience" | "dailyRate" | "";
type SortDirection = "asc" | "desc";

interface AdventurersFiltersProps {
	archetypes: string[];
	count: number;
}

export default function AdventurersFilters({
	archetypes,
	count,
}: AdventurersFiltersProps) {
	const theme = useTheme();
	const [searchParams, setSearchParams] = useSearchParams();

	// État local pour le debounce de recherche
	const [searchInputValue, setSearchInputValue] = useState(
		searchParams.get("search") || ""
	);

	// Récupération des paramètres d'URL
	const searchTerm = searchParams.get("search") || "";
	const selectedArchetype = searchParams.get("archetype") || "";
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

	// Fonctions pour mettre à jour les paramètres d'URL (modifiées pour le debounce)
	const updateSearch = (value: string) => {
		setSearchInputValue(value);
	};

	const updateArchetype = (value: string) => {
		if (value) {
			searchParams.set("archetype", value);
		} else {
			searchParams.delete("archetype");
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
		<Box
			sx={{
				p: { xs: 2, sm: 3 },
				borderRadius: 3,
				backgroundColor: alpha(theme.palette.background.paper, 0.7),
				backdropFilter: "blur(10px)",
				border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				transition: "all 0.3s ease",
				mb: 4,
				"&:hover": {
					boxShadow: `0 8px 16px ${alpha(theme.palette.common.black, 0.1)}`,
					transform: "translateY(-2px)",
				},
			}}
		>
			<Stack spacing={3}>
				<Typography
					variant="h6"
					sx={{
						fontWeight: 600,
						color: theme.palette.primary.light,
						mb: 1,
					}}
				>
					Filtrer les aventuriers
				</Typography>

				<Grid container spacing={3}>
					{/* Barre de recherche avec debounce */}
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							placeholder="Rechercher un aventurier..."
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
								"& .MuiOutlinedInput-root": {
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
								},
							}}
						/>
					</Grid>

					{/* Sélecteur d'archétype */}
					<Grid item xs={12} md={6}>
						<FormControl fullWidth>
							<Select
								displayEmpty
								value={selectedArchetype}
								onChange={(e) => updateArchetype(e.target.value)}
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
								<MenuItem value="">Tous les archétypes</MenuItem>
								{archetypes.map((archetype) => (
									<MenuItem key={archetype} value={archetype}>
										{archetype}
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
							variant={sortField === "experience" ? "contained" : "outlined"}
							color="primary"
							onClick={() => toggleSort("experience")}
							startIcon={<StarIcon />}
							endIcon={
								sortField === "experience" &&
								(sortDirection === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />)
							}
							sx={{
								flex: 1,
								borderRadius: 2,
								transition: "all 0.2s ease",
								py: 1,
								...(sortField !== "experience" && {
									borderColor: alpha(theme.palette.primary.main, 0.3),
									color: theme.palette.primary.light,
									"&:hover": {
										borderColor: theme.palette.primary.main,
										backgroundColor: alpha(theme.palette.primary.main, 0.08),
									},
								}),
							}}
						>
							Expérience
						</Button>
						<Button
							variant={sortField === "dailyRate" ? "contained" : "outlined"}
							color="primary"
							onClick={() => toggleSort("dailyRate")}
							startIcon={<EuroIcon />}
							endIcon={
								sortField === "dailyRate" &&
								(sortDirection === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />)
							}
							sx={{
								flex: 1,
								borderRadius: 2,
								transition: "all 0.2s ease",
								py: 1,
								...(sortField !== "dailyRate" && {
									borderColor: alpha(theme.palette.primary.main, 0.3),
									color: theme.palette.primary.light,
									"&:hover": {
										borderColor: theme.palette.primary.main,
										backgroundColor: alpha(theme.palette.primary.main, 0.08),
									},
								}),
							}}
						>
							Tarif
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
						{(searchTerm || selectedArchetype || sortField) && (
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
							label={`${count} aventurier${count > 1 ? "s" : ""}`}
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
