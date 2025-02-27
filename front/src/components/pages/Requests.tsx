import {
	alpha,
	Box,
	Container,
	Paper,
	Typography,
	useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useFilteredRequests } from "../../hooks/useFilteredRequests";
import RequestsFilters from "../ui/RequestsFilters";
import RequestsList from "../ui/RequestsList";

export default function Requests() {
	const theme = useTheme();
	// Utiliser notre hook personnalisé qui gère les données et les filtres via URL
	const { requests, statuses, isLoading, isError, error, refetch } =
		useFilteredRequests();

	// Variants pour les animations
	const pageVariants = {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: "easeOut",
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		initial: { opacity: 0, y: 10 },
		animate: { opacity: 1, y: 0 },
	};

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

			<Container maxWidth="xl" sx={{ px: { xs: 2, md: 3, lg: 4 } }}>
				<motion.div initial="initial" animate="animate" variants={pageVariants}>
					<motion.div variants={itemVariants}>
						<Box className="mb-6">
							<Typography
								variant="h3"
								component="h1"
								align="left"
								gutterBottom
								sx={{
									background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									fontWeight: 800,
									marginBottom: 1,
									textShadow: `0 4px 12px ${alpha(
										theme.palette.common.black,
										0.2
									)}`,
								}}
							>
								Les Requêtes de la Guilde
							</Typography>
							<Typography
								variant="subtitle1"
								align="left"
								className="text-slate-300 max-w-3xl leading-relaxed mb-4"
							>
								Parcourez les missions disponibles et choisissez celles qui
								correspondent à vos compétences. Des récompenses généreuses
								attendent les aventuriers qui relèveront ces défis !
							</Typography>
						</Box>
					</motion.div>

					<motion.div variants={itemVariants}>
						<Paper
							elevation={0}
							sx={{
								p: { xs: 2, sm: 3, md: 4 },
								borderRadius: 3,
								width: "100%",
								backgroundColor: "rgba(15, 23, 42, 0.5)",
								backdropFilter: "blur(12px)",
								border: "1px solid rgba(71, 85, 105, 0.2)",
								boxShadow:
									"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
								"&:hover": {
									boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
								},
								transition: "all 0.3s ease-in-out",
							}}
						>
							{/* Composant de filtres qui utilise les paramètres d'URL */}
							<RequestsFilters statuses={statuses} count={requests.length} />

							{/* Composant de liste qui affiche les requêtes filtrées */}
							<RequestsList
								requests={requests}
								isLoading={isLoading}
								isError={isError}
								error={error}
								refetch={refetch}
							/>
						</Paper>
					</motion.div>
				</motion.div>
			</Container>
		</Box>
	);
}
