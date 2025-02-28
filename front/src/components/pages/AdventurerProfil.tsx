import {
	alpha,
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Paper,
	Stack,
	Typography,
	useTheme,
	Chip,
	Card,
	CardContent,
	LinearProgress,
} from "@mui/material";
import {
	SportsMartialArts as ArcherIcon,
	Bolt as AssassinIcon,
	AutoFixHigh as MageIcon,
	Diversity3 as PaladinIcon,
	Shield as ShieldIcon,
	ArrowBack as BackIcon,
	Star as StarIcon,
	EmojiEvents as TrophyIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Archetype } from "../../utils/enum";
import { useAdventurers } from "../../hooks/useAdventurers";

interface Adventurer {
	id: number;
	name: string;
	experience: number;
	archetype: Archetype | string;
	dailyRate: number;
	image?: string;
}

// Définition des archetypes (copié depuis AdventurerCard.tsx)
const archetypeDisplayNames: Record<Archetype, string> = {
	[Archetype.WARRIOR]: "Guerrier",
	[Archetype.PALADIN]: "Paladin",
	[Archetype.HUNTER]: "Archer",
	[Archetype.ROGUE]: "Assassin",
	[Archetype.PRIEST]: "Prêtre",
	[Archetype.DEATH_KNIGHT]: "Chevalier de la Mort",
	[Archetype.SHAMAN]: "Chaman",
	[Archetype.MAGE]: "Mage",
	[Archetype.WARLOCK]: "Démoniste",
	[Archetype.MONK]: "Moine",
	[Archetype.DRUID]: "Druide",
	[Archetype.DEMON_HUNTER]: "Chasseur de Démons",
	[Archetype.EVOKER]: "Évocateur",
};

const normalizeArchetype = (archetypeInput: Archetype | string): Archetype => {
	if (typeof archetypeInput === 'string') {
		const stringToEnum: Record<string, Archetype> = {
			"WARRIOR": Archetype.WARRIOR,
			"HUNTER": Archetype.HUNTER,
			"ROGUE": Archetype.ROGUE,
			"PALADIN": Archetype.PALADIN,
			"MAGE": Archetype.MAGE,
			"PRIEST": Archetype.PRIEST,
			"DEATH_KNIGHT": Archetype.DEATH_KNIGHT,
			"SHAMAN": Archetype.SHAMAN,
			"WARLOCK": Archetype.WARLOCK,
			"MONK": Archetype.MONK,
			"DRUID": Archetype.DRUID,
			"DEMON_HUNTER": Archetype.DEMON_HUNTER,
			"EVOKER": Archetype.EVOKER,
		};
		return stringToEnum[archetypeInput] || Archetype.WARRIOR;
	}
	return archetypeInput;
};

export default function AdventurerProfil() {
	const theme = useTheme();
    const { id } = useParams<{ id: string }>();
    const { data: adventurersData, isLoading, isError } = useAdventurers();

    const adventurer: Adventurer | undefined = adventurersData?.find((adv) => adv.id === Number(id));

    console.log("Aventurier récupéré :", adventurer);

	// Animation variants
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

	// Helper functions (copied from AdventurerCard.tsx)
	const getArchetypeIcon = (archetype: Archetype) => {
		const archetypeName = archetypeDisplayNames[archetype];
		
		switch (archetypeName) {
			case "Guerrier":
				return <ShieldIcon data-testid="GuerrierIcon" />;
			case "Mage":
				return <MageIcon data-testid="MageIcon" />;
			case "Assassin":
				return <AssassinIcon data-testid="AssassinIcon" />;
			case "Paladin":
				return <PaladinIcon data-testid="PaladinIcon" />;
			case "Archer":
				return <ArcherIcon data-testid="ArcherIcon" />;
			default:
				return <StarIcon data-testid="DefaultIcon" />;
		}
	};

	const getArchetypeColor = (archetype: Archetype) => {
		const archetypeName = archetypeDisplayNames[archetype];
		
		switch (archetypeName) {
			case "Guerrier":
				return "#f97316"; // Orange
			case "Mage":
				return "#3b82f6"; // Bleu
			case "Assassin":
				return "#a855f7"; // Pourpre
			case "Paladin":
				return "#eab308"; // Or
			case "Archer":
				return "#22c55e"; // Vert
			default:
				return "#6366f1"; // Indigo
		}
	};

	const getRank = (experience: number) => {
		if (experience < 200) return { name: "Novice", color: "#64748b", progress: 20 };
		if (experience < 500) return { name: "Apprenti", color: "#38bdf8", progress: 40 };
		if (experience < 1000) return { name: "Adepte", color: "#4ade80", progress: 60 };
		if (experience < 2000) return { name: "Expert", color: "#eab308", progress: 80 };
		return { name: "Maître", color: "#ec4899", progress: 100 };
	};

	if (isLoading) {
        return (
            <Container maxWidth="xl" sx={{ py: 5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <LinearProgress color="primary" sx={{ width: '50%' }} />
                </Box>
            </Container>
        );
    }
    
    if (isError || !adventurer) {
		return (
			<Container maxWidth="xl" sx={{ py: 5 }}>
				<Paper
					elevation={0}
					sx={{
						p: 4,
						borderRadius: 3,
						backgroundColor: "rgba(15, 23, 42, 0.5)",
						backdropFilter: "blur(12px)",
						border: "1px solid rgba(71, 85, 105, 0.2)",
					}}
				>
					<Typography variant="h5" color="error" align="center">
						{isError || "Aventurier non trouvé"}
					</Typography>
					<Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to="/aventuriers"
							startIcon={<BackIcon />}
						>
							Retour à la liste
						</Button>
					</Box>
				</Paper>
			</Container>
		);
    }

	const archetype = normalizeArchetype(adventurer.archetype);
	const archetypeName = archetypeDisplayNames[archetype] || "Inconnu";
	const archetypeIcon = getArchetypeIcon(archetype);
	const archetypeColor = getArchetypeColor(archetype);
	const rank = getRank(adventurer.experience);

	return (
		<Box
			className="min-h-screen py-20"
			sx={{
				backgroundColor: "transparent",
				position: "relative",
				overflow: "hidden",
			}}
		>
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
						<Button
							variant="text"
							color="primary"
							component={Link}
							to="/aventuriers"
							startIcon={<BackIcon />}
							sx={{ mb: 3 }}
						>
							Retour à la liste
						</Button>
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
							}}
						>
							<Grid container spacing={4}>
								{/* En-tête du profil */}
								<Grid item xs={12}>
									<Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
										<Avatar
											src={adventurer.image}
											sx={{
												width: 100,
												height: 100,
												border: `3px solid ${alpha(archetypeColor, 0.3)}`,
												backgroundColor: alpha(archetypeColor, 0.2),
												boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
												mr: 3
											}}
										>
											{archetypeIcon}
										</Avatar>
										<Box>
											<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
												<Typography variant="h4" sx={{ fontWeight: 700, mr: 2 }}>
													{adventurer.name}
												</Typography>
												<Chip
													icon={archetypeIcon}
													label={archetypeName}
													size="medium"
													sx={{
														backgroundColor: alpha(archetypeColor, 0.2),
														color: archetypeColor,
														borderRadius: "6px",
														"& .MuiChip-icon": {
															color: archetypeColor,
														},
													}}
												/>
											</Box>
											<Box sx={{ display: 'flex', alignItems: 'center' }}>
												<Typography variant="subtitle1" color="text.secondary" sx={{ mr: 2 }}>
													Rang: <span style={{ color: rank.color }}>{rank.name}</span>
												</Typography>
												<Typography variant="subtitle1" color="text.secondary">
													Taux journalier: <span style={{ color: "#4caf50" }}>{adventurer.dailyRate} PO</span>
												</Typography>
											</Box>
										</Box>
									</Box>
								</Grid>

								{/* Colonne principale avec description */}
								<Grid item xs={12} md={8}>
									<Card
										sx={{
											backgroundColor: 'rgba(30, 41, 59, 0.5)',
											borderRadius: 3,
											height: '100%',
										}}
									>
									</Card>
								</Grid>

								{/* Colonne d'informations complémentaires */}
								<Grid item xs={12} md={4}>
									<Card
										sx={{
											backgroundColor: 'rgba(30, 41, 59, 0.5)',
											borderRadius: 3,
											height: '100%',
										}}
									>
										<CardContent>
											<Typography variant="h6" sx={{ mb: 3, borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 1 }}>
												Statistiques
											</Typography>

											<Stack spacing={2}>
												<Box sx={{ display: 'flex', alignItems: 'center' }}>
													<TrophyIcon sx={{ color: '#eab308', mr: 2 }} />
													<Box>
														<Typography variant="body2" color="text.secondary">
															Expérience
														</Typography>
														<Typography variant="body1">
															{adventurer.experience} points
														</Typography>
													</Box>
												</Box>

												<Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
											</Stack>
										</CardContent>
									</Card>
								</Grid>

								{/* Actions */}
								<Grid item xs={12}>
									<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
										<Button
											variant="contained"
											color="primary"
											sx={{
												borderRadius: "10px",
												padding: "12px 24px",
												background: "linear-gradient(90deg, #6366F1 0%, #4F46E5 100%)",
												boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
												fontWeight: 600,
											}}
										>
											Engager pour une quête
										</Button>
										<Button
											variant="outlined"
											color="primary"
											component={Link}
											to={`/aventuriers/${id}/modifier`}
											sx={{
												borderRadius: "10px",
												padding: "12px 24px",
												fontWeight: 600,
											}}
										>
											Modifier le profil
										</Button>
									</Box>
								</Grid>
							</Grid>
						</Paper>
					</motion.div>
				</motion.div>
			</Container>
		</Box>
	);
}