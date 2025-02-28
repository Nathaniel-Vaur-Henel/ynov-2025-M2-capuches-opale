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
import { motion } from "framer-motion";
import { Adventurer } from "../../hooks/useFilteredAdventurers";
import AdventurerCard from "./AdventurerCard";
import { useEffect } from "react";

interface AdventurersListProps {
	adventurers: Adventurer[];
	isLoading: boolean;
	isError: boolean;
	error: Error | null;
	refetch: () => void;
}

export default function AdventurersList({
	adventurers,
	isLoading,
	isError,
	error,
	refetch,
}: AdventurersListProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		console.log("AdventurersList rendered");
		console.log("adventurers", adventurers);
	}, [adventurers]);

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
						onClick={refetch}
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
					{adventurers.map((adventurer) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={adventurer.id}>
							<motion.div variants={itemVariants}>
								<AdventurerCard
									id={adventurer.id}
									name={adventurer.name}
									archetype={adventurer.archetype}
									experience={adventurer.experience}
									dailyRate={adventurer.dailyRate}
									image={adventurer.image}
								/>
							</motion.div>
						</Grid>
					))}
				</Grid>
			</motion.div>
		</Box>
	);
}
