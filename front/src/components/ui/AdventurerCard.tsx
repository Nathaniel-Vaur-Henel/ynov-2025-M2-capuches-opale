import {
	SportsMartialArts as ArcherIcon,
	Bolt as AssassinIcon,
	EuroSymbol as EuroIcon,
	AutoFixHigh as MageIcon,
	Diversity3 as PaladinIcon,
	Shield as ShieldIcon,
	Star as StarIcon,
	AccessTime as TimeIcon,
} from "@mui/icons-material";
import {
	alpha,
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Chip,
	Divider,
	LinearProgress,
	linearProgressClasses,
	Stack,
	styled,
	Typography,
} from "@mui/material";

interface AdventurerCardProps {
	name: string;
	experience: number;
	archetype: string;
	dailyRate: number;
	image?: string;
}

// Styled components
const StyledCard = styled(Card)(() => ({
	height: "100%",
	display: "flex",
	flexDirection: "column",
	borderRadius: 16,
	overflow: "visible",
	position: "relative",
	transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
	background:
		"linear-gradient(165deg, rgba(25, 30, 45, 0.95) 0%, rgba(30, 38, 60, 0.95) 100%)",
	backdropFilter: "blur(10px)",
	border: "1px solid rgba(99, 102, 241, 0.2)",
	boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
	"&:hover": {
		transform: "translateY(-8px)",
		boxShadow: "0 22px 40px rgba(0, 0, 0, 0.3)",
	},
	"&::after": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		borderRadius: "inherit",
		boxShadow: "0 0 40px rgba(99, 102, 241, 0.3)",
		opacity: 0,
		transition: "opacity 0.3s, transform 0.3s",
		zIndex: -1,
	},
}));

const RankBadge = styled(Box)(() => ({
	position: "absolute",
	top: -12,
	right: 20,
	padding: "4px 12px",
	borderRadius: "6px",
	fontWeight: 700,
	fontSize: "0.85rem",
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
	zIndex: 2,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
	width: 80,
	height: 80,
	border: "3px solid rgba(99, 102, 241, 0.3)",
	backgroundColor: alpha(theme.palette.primary.main, 0.2),
	boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
	marginRight: theme.spacing(2),
}));

const StyledProgress = styled(LinearProgress)(({ theme }) => ({
	height: 6,
	borderRadius: 3,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: alpha(theme.palette.primary.main, 0.15),
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 3,
		background: "linear-gradient(90deg, #818cf8 0%, #6366f1 100%)",
	},
}));

const mapArchetype = (archetype: string): string => {
	const archetypeMap: Record<string, string> = {
		HUNTER: "Archer",
		WARRIOR: "Guerrier",
		PALADIN: "Paladin",
		MAGE: "Mage",
		ROGUE: "Assassin",
	};

	return archetypeMap[archetype] || archetype; // Retourne la traduction ou l'original si non trouvé
};

const AdventurerCard = ({
	name,
	experience,
	archetype,
	dailyRate,
	image,
}: AdventurerCardProps) => {
	// Définir le rang en fonction de l'expérience
	const getRank = () => {
		if (experience < 200) return { name: "Novice", color: "#64748b" };
		if (experience < 500) return { name: "Apprenti", color: "#38bdf8" };
		if (experience < 1000) return { name: "Adepte", color: "#4ade80" };
		if (experience < 2000) return { name: "Expert", color: "#eab308" };
		return { name: "Maître", color: "#ec4899" };
	};

	const rank = getRank();

	// Expérience maximum pour la barre de progression
	const getMaxExperience = () => {
		if (experience < 200) return 200;
		if (experience < 500) return 500;
		if (experience < 1000) return 1000;
		if (experience < 2000) return 2000;
		return 3000;
	};

	const maxExperience = getMaxExperience();
	const experienceProgress = (experience / maxExperience) * 100;

	// Icône en fonction de l'archetype
	const getArchetypeIcon = (archetype: string) => {
		const archetypeFr = mapArchetype(archetype);
		
		switch (archetypeFr) {
			case "Guerrier":
				return <ShieldIcon />;
			case "Mage":
				return <MageIcon />;
			case "Assassin":
				return <AssassinIcon />;
			case "Paladin":
				return <PaladinIcon />;
			case "Archer":
				return <ArcherIcon />;
			default:
				return <StarIcon />;
		}
	};	

	// Couleur en fonction de l'archetype
	const getArchetypeColor = (archetype: string) => {
		const archetypeFr = mapArchetype(archetype); // Traduire en français
		
		switch (archetypeFr) {
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
	
	const archetypeFr = mapArchetype(archetype); 
	const archetypeIcon = getArchetypeIcon(archetype); 
	const archetypeColor = getArchetypeColor(archetype);

	return (
		<StyledCard
			elevation={3}
			className="bg-zinc-900/70 backdrop-blur-md border border-gray-800/20 shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
		>
			<RankBadge
				sx={{ backgroundColor: alpha(rank.color, 0.2), color: rank.color }}
			>
				{rank.name}
			</RankBadge>

			<CardHeader
				avatar={
					<StyledAvatar
						src={image}
						alt={name}
						sx={{ backgroundColor: alpha(archetypeColor, 0.2) }}
					>
						{archetypeIcon}
					</StyledAvatar>
				}
				title={
					<Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
						{name}
					</Typography>
				}
				subheader={
					<Box sx={{ mt: 0.5 }}>
						<Typography
							variant="caption"
							color="text.secondary"
							sx={{ fontWeight: 500, display: "block", mb: 0.5 }}
						>
							Expérience
						</Typography>
						<Stack direction="row" spacing={1} alignItems="center">
							<StyledProgress
								variant="determinate"
								value={experienceProgress}
								sx={{ flexGrow: 1 }}
							/>
							<Typography
								variant="caption"
								fontWeight="medium"
								color={rank.color}
							>
								{experience}
							</Typography>
						</Stack>
					</Box>
				}
				sx={{ pb: 0 }}
			/>

			<CardContent sx={{ pt: 1, flexGrow: 1 }}>
				<Stack spacing={2}>

					<Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="body2" color="text.secondary">
							Spécialité
						</Typography>
						<Chip
							icon={archetypeIcon}
							label={archetypeFr}
							size="small"
							sx={{
								backgroundColor: alpha(archetypeColor, 0.2),
								color: archetypeColor,
								borderRadius: "6px",
								"& .MuiChip-icon": {
									color: archetypeColor,
								},
							}}
						/>
					</Stack>

					<Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="body2" color="text.secondary">
							Taux journalier
						</Typography>
						<Chip
							icon={<EuroIcon />}
							label={`${dailyRate} PO`}
							size="small"
							sx={{
								backgroundColor: alpha("#4caf50", 0.2),
								color: "#4caf50",
								borderRadius: "6px",
								"& .MuiChip-icon": {
									color: "#4caf50",
								},
							}}
						/>
					</Stack>
				</Stack>
			</CardContent>

			<CardActions sx={{ p: 2 }}>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					startIcon={<TimeIcon />}
					sx={{
						borderRadius: "10px",
						padding: "10px",
						background: "linear-gradient(90deg, #6366F1 0%, #4F46E5 100%)",
						boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
						fontWeight: 600,
						transition: "all 0.3s ease",
						overflow: "hidden",
						position: "relative",
						"&::before": {
							content: '""',
							position: "absolute",
							top: 0,
							left: "-100%",
							width: "100%",
							height: "100%",
							background:
								"linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
							transition: "left 0.7s ease",
						},
						"&:hover": {
							transform: "translateY(-2px)",
							boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
							"&::before": {
								left: "100%",
							},
						},
					}}
				>
					Engager
				</Button>
			</CardActions>
		</StyledCard>
	);
};

export default AdventurerCard;
