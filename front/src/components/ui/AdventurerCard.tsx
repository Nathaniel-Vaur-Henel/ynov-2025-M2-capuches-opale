import {
	SportsMartialArts as ArcherIcon,
	Bolt as AssassinIcon,
	AutoFixHigh as MageIcon,
	Diversity3 as PaladinIcon,
	Shield as ShieldIcon,
	Star as StarIcon,
	Edit as EditIcon,
	Visibility as ViewIcon,
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
	Stack,
	styled,
	Typography,
	IconButton,
	Tooltip,
} from "@mui/material";
import { Archetype } from "../../utils/enum"; 
import { Link } from "react-router-dom";

interface AdventurerCardProps {
	id: number;
	name: string;
	experience: number;
	archetype: Archetype | string;
	dailyRate: number;
	image?: string;
}

const normalizeArchetype = (archetypeInput: Archetype | string): Archetype => {
	if (typeof archetypeInput === 'string') {
	  // Mapping des strings vers les enums
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

const AdventurerCard = ({
	id,
	name,
	experience,
	archetype: archetypeInput,
	dailyRate,
	image,
}: AdventurerCardProps) => {
	const archetype = normalizeArchetype(archetypeInput);

	console.log("Id de l'aventurier:", id);

	const getRank = () => {
		if (experience < 200) return { name: "Novice", color: "#64748b" };
		if (experience < 500) return { name: "Apprenti", color: "#38bdf8" };
		if (experience < 1000) return { name: "Adepte", color: "#4ade80" };
		if (experience < 2000) return { name: "Expert", color: "#eab308" };
		return { name: "Maître", color: "#ec4899" };
	};

	const rank = getRank();

	// Icône en fonction de l'archetype
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
				console.log("Archétype non reconnu:", archetype);
				return <StarIcon data-testid="DefaultIcon" />;
		}
	};

	// Couleur en fonction de l'archetype
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
	
	const archetypeName = archetypeDisplayNames[archetype] || "Inconnu";
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
							Expérience <span style={{color: rank.color}}>{experience}</span> pts
						</Typography>
					</Box>
				}
				sx={{ pb: 0 }}
				action={
					<Tooltip title="Modifier l'aventurier">
						<IconButton 
							component={Link} 
							to={`/aventuriers/${id}/modifier`}
							size="small" 
							sx={{ 
								backgroundColor: alpha("#4F46E5", 0.1),
								color: "#4F46E5",
								"&:hover": {
									backgroundColor: alpha("#4F46E5", 0.2),
								},
								mt: 1,
								mr: 1
							}}
						>
							<EditIcon fontSize="small" />
						</IconButton>
					</Tooltip>
				}
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
							label={archetypeName}
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
					startIcon={<ViewIcon />}
					component={Link}
					to={`/aventuriers/${id}`}
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
					Consulter
				</Button>
			</CardActions>
		</StyledCard>
	);
};

export default AdventurerCard;
