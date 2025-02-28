import { Box, Button, alpha, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import AdventurerForm from "../forms/AdventurerForm";

export default function AdventurerFormPage() {
	const theme = useTheme();
	const { id } = useParams();
	const location = useLocation();

	// Détermine si nous sommes en mode édition en vérifiant l'URL
	const isEditMode = location.pathname.includes("/modifier/");

	// N'exécute la requête que si nous sommes en mode édition et avons un ID
	const { data: adventurer } = useQuery({
		queryKey: ["adventurer", id],
		queryFn: async () =>
			await fetch(`${import.meta.env.VITE_API_URL}/adventurer/${id}`).then(
				(res) => res.json()
			),
		enabled: isEditMode && !!id, // N'exécute la requête que si nous sommes en mode édition
	});

	console.log(adventurer);

	return (
		<Box
			className="min-h-screen py-20"
			sx={{
				backgroundColor: "transparent",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Fond d'ambiance subtil */}
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: `radial-gradient(circle at 20% 30%, ${alpha(
						theme.palette.primary.dark,
						0.15
					)} 0%, transparent 50%), 
					radial-gradient(circle at 80% 60%, ${alpha(
						theme.palette.secondary.dark,
						0.1
					)} 0%, transparent 50%)`,
					zIndex: -1,
				}}
			/>

			{/* Passe l'aventurier seulement si nous sommes en mode édition */}
			{isEditMode && adventurer ? (
				<AdventurerForm adventurer={adventurer} />
			) : (
				<AdventurerForm />
			)}

			{/* Bouton de retour a la liste des aventuriers */}
			<Button
				variant="contained"
				color="primary"
				sx={{
					position: "absolute",
					top: 0,
					right: 0,
					m: 2,
					zIndex: 10,
				}}
				href="/aventuriers"
			>
				Retour à la liste
			</Button>
		</Box>
	);
}
