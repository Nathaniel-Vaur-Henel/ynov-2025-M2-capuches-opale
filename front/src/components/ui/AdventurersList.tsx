import { Refresh as RefreshIcon } from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	Grid,
	Skeleton,
	Stack,
	Typography,
	alpha,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Adventurer from "../../types/Adventurer";
import AdventurerCard from "./AdventurerCard";

export default function AdventurersList() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const {
		data: adventurers,
		refetch: refetch,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ["adventurers"],
		queryFn: async () => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/adventurer`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error(`Erreur ${response.status}: ${response.statusText}`);
			}

			return response.json();
		},
		staleTime: 1000 * 60 * 5,
		retry: 2,
	});

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 20,
			},
		},
	};

	if (isLoading) {
		return (
			<Grid container spacing={3}>
				{[...Array(8)].map((_, index) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
						<Skeleton
							variant="rounded"
							height={340}
							sx={{
								borderRadius: 3,
								bgcolor: alpha(theme.palette.primary.main, 0.1),
							}}
						/>
					</Grid>
				))}
			</Grid>
		);
	}

	if (isError) {
		return (
			<Alert
				severity="error"
				action={
					<Button
						color="inherit"
						size="small"
						onClick={() => refetch()}
						startIcon={<RefreshIcon />}
					>
						Réessayer
					</Button>
				}
				sx={{
					borderRadius: 2,
					backgroundColor: alpha(theme.palette.error.main, 0.1),
					border: `1px solid ${alpha(theme.palette.error.main, 0.2)}`,
				}}
			>
				{error?.message ||
					"Une erreur est survenue lors du chargement des aventuriers."}
			</Alert>
		);
	}

	if (adventurers.length === 0) {
		return (
			<Stack
				spacing={2}
				alignItems="center"
				sx={{
					py: 8,
					borderRadius: 3,
					backgroundColor: alpha(theme.palette.background.paper, 0.4),
					border: `1px dashed ${alpha(theme.palette.divider, 0.2)}`,
				}}
			>
				<Typography variant="h6" color="text.secondary" align="center">
					Aucun aventurier ne correspond à votre recherche.
				</Typography>
			</Stack>
		);
	}

	return (
		<Box sx={{ pt: 2 }}>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<Grid container spacing={isMobile ? 2 : 3} sx={{ mt: 1 }}>
					{adventurers.map((adventurer: Adventurer) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={adventurer.id}>
							<motion.div variants={itemVariants}>
								<AdventurerCard
									name={adventurer.name}
									experience={adventurer.experience}
									archetype={adventurer.archetype}
									dailyRate={adventurer.dailyRate}
								/>
							</motion.div>
						</Grid>
					))}
				</Grid>
			</motion.div>
		</Box>
	);
}
