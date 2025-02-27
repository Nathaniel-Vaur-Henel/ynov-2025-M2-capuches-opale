import {
	Assignment as AssignmentIcon,
	CalendarToday as CalendarIcon,
	AttachMoney as MoneyIcon,
	Person as PersonIcon,
} from "@mui/icons-material";
import {
	alpha,
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
	useTheme,
} from "@mui/material";
import { format, isAfter } from "date-fns";
import { fr } from "date-fns/locale";

interface RequestCardProps {
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
}));

const StatusBadge = styled(Box)(() => ({
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

const RequestCard = ({
	title,
	description,
	bounty,
	status,
	dueDate,
	backer,
}: RequestCardProps) => {
	const theme = useTheme();
	const isExpired = isAfter(new Date(), new Date(dueDate));

	// Couleur et libellé en fonction du statut
	const getStatusInfo = () => {
		switch (status) {
			case "PENDING":
				return { color: "#3b82f6", label: "En attente" }; // Bleu
			case "VALIDATED":
				return { color: "#8b5cf6", label: "Validée" }; // Violet
			case "SUCCESS":
				return { color: "#10b981", label: "Réussie" }; // Vert
			case "FAILURE":
				return { color: "#ef4444", label: "Échouée" }; // Rouge
			case "REFUSED":
				return { color: "#f97316", label: "Refusée" }; // Orange
			case "ABANDONED":
				return { color: "#6b7280", label: "Abandonnée" }; // Gris
			default:
				return { color: "#6366f1", label: "Inconnue" }; // Indigo
		}
	};

	const statusInfo = getStatusInfo();

	return (
		<StyledCard elevation={3}>
			<StatusBadge
				sx={{
					backgroundColor: alpha(statusInfo.color, 0.2),
					color: statusInfo.color,
				}}
			>
				{statusInfo.label}
			</StatusBadge>

			<CardHeader
				title={
					<Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
						{title}
					</Typography>
				}
				subheader={
					<Stack
						direction="row"
						spacing={1}
						alignItems="center"
						sx={{ mt: 0.5 }}
					>
						<PersonIcon
							fontSize="small"
							sx={{ color: theme.palette.text.secondary }}
						/>
						<Typography variant="body2" color="text.secondary">
							{backer}
						</Typography>
					</Stack>
				}
				sx={{ pb: 0 }}
			/>

			<CardContent sx={{ pt: 1, flexGrow: 1 }}>
				<Stack spacing={2}>
					<Box sx={{ minHeight: 80 }}>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
							Description
						</Typography>
						<Typography variant="body2">{description}</Typography>
					</Box>

					<Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="body2" color="text.secondary">
							Récompense
						</Typography>
						<Chip
							icon={<MoneyIcon />}
							label={`${bounty} PO`}
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

					<Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
					>
						<Typography variant="body2" color="text.secondary">
							Échéance
						</Typography>
						<Chip
							icon={<CalendarIcon />}
							label={format(new Date(dueDate), "dd MMM yyyy", { locale: fr })}
							size="small"
							sx={{
								backgroundColor: alpha(isExpired ? "#ef4444" : "#3b82f6", 0.2),
								color: isExpired ? "#ef4444" : "#3b82f6",
								borderRadius: "6px",
								"& .MuiChip-icon": {
									color: isExpired ? "#ef4444" : "#3b82f6",
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
					startIcon={<AssignmentIcon />}
					disabled={status !== "PENDING"}
					sx={{
						borderRadius: "10px",
						padding: "10px",
						background:
							status === "PENDING"
								? "linear-gradient(90deg, #6366F1 0%, #4F46E5 100%)"
								: undefined,
						boxShadow:
							status === "PENDING"
								? "0 4px 14px rgba(99, 102, 241, 0.3)"
								: undefined,
						fontWeight: 600,
						transition: "all 0.3s ease",
						overflow: "hidden",
						position: "relative",
						"&::before":
							status === "PENDING"
								? {
										content: '""',
										position: "absolute",
										top: 0,
										left: "-100%",
										width: "100%",
										height: "100%",
										background:
											"linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
										transition: "left 0.7s ease",
								  }
								: undefined,
						"&:hover":
							status === "PENDING"
								? {
										transform: "translateY(-2px)",
										boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)",
										"&::before": {
											left: "100%",
										},
								  }
								: undefined,
					}}
				>
					{status === "PENDING" ? "Accepter la quête" : "Quête non disponible"}
				</Button>
			</CardActions>
		</StyledCard>
	);
};

export default RequestCard;
