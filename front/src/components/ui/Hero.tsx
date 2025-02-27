import {
	PeopleAlt as AdventurersIcon,
	Assignment as QuestsIcon,
} from "@mui/icons-material";
import {
	alpha,
	Box,
	Button,
	Container,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

export default function Hero() {
	const theme = useTheme();

	return (
		<Box
			component="section"
			sx={{
				position: "relative",
				overflow: "hidden",
				minHeight: "calc(100vh - 64px)",
				display: "flex",
				alignItems: "center",
				py: { xs: 8, md: 12 },
				backgroundImage: `linear-gradient(to bottom, ${alpha(
					theme.palette.background.default,
					0.9
				)}, ${alpha(theme.palette.background.default, 0.95)})`,
			}}
		>
			{/* Animated background particles */}
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 0,
					opacity: 0.6,
				}}
			>
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={i}
						initial={{
							x: Math.random() * window.innerWidth,
							y: Math.random() * window.innerHeight,
							scale: Math.random() * 0.5 + 0.5,
						}}
						animate={{
							x: [
								Math.random() * window.innerWidth,
								Math.random() * window.innerWidth,
								Math.random() * window.innerWidth,
							],
							y: [
								Math.random() * window.innerHeight,
								Math.random() * window.innerHeight,
								Math.random() * window.innerHeight,
							],
							transition: {
								duration: Math.random() * 60 + 60,
								repeat: Infinity,
								ease: "linear",
							},
						}}
						style={{
							position: "absolute",
							width: Math.random() * 20 + 10,
							height: Math.random() * 20 + 10,
							borderRadius: "50%",
							background: `radial-gradient(circle, ${alpha(
								theme.palette.primary.main,
								0.8
							)}, ${alpha(theme.palette.primary.main, 0)})`,
							filter: "blur(8px)",
						}}
					/>
				))}
			</Box>

			{/* Main content */}
			<Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
				<Stack
					direction={{ xs: "column", md: "row" }}
					spacing={{ xs: 6, md: 10 }}
					alignItems="center"
					justifyContent="space-between"
				>
					<Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, ease: "easeOut" }}
						>
							<Typography
								variant="h1"
								component="h1"
								sx={{
									fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
									fontWeight: 800,
									mb: 2,
									background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.secondary.main} 100%)`,
									backgroundClip: "text",
									textFillColor: "transparent",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									textShadow: `0 10px 20px ${alpha(
										theme.palette.primary.main,
										0.3
									)}`,
								}}
							>
								Capuche Opale
							</Typography>

							<Typography
								variant="h2"
								sx={{
									fontSize: { xs: "1.5rem", md: "1.75rem", lg: "2rem" },
									fontWeight: 600,
									mb: 3,
									color: alpha(theme.palette.text.primary, 0.9),
								}}
							>
								La Guilde des Aventuriers d'Élite
							</Typography>

							<Typography
								variant="body1"
								sx={{
									fontSize: { xs: "1rem", md: "1.1rem" },
									color: theme.palette.text.secondary,
									mb: 4,
									maxWidth: "90%",
								}}
							>
								Découvrez les meilleurs aventuriers et relevez des quêtes
								palpitantes dans un monde où chaque mission peut changer votre
								destinée. Êtes-vous prêt à façonner votre légende?
							</Typography>

							<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
								<Button
									component={RouterLink}
									to="/aventuriers"
									variant="contained"
									size="large"
									startIcon={<AdventurersIcon />}
									sx={{
										py: 1.5,
										px: 3,
										fontSize: "1rem",
										borderRadius: "10px",
										background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
										boxShadow: `0 10px 20px ${alpha(
											theme.palette.primary.main,
											0.4
										)}`,
										position: "relative",
										overflow: "hidden",
										"&::before": {
											content: '""',
											position: "absolute",
											top: 0,
											left: "-100%",
											width: "100%",
											height: "100%",
											background: `linear-gradient(90deg, transparent, ${alpha(
												"#ffffff",
												0.2
											)}, transparent)`,
											transition: "left 0.7s ease",
										},
										"&:hover": {
											transform: "translateY(-3px)",
											boxShadow: `0 15px 25px ${alpha(
												theme.palette.primary.main,
												0.5
											)}`,
											"&::before": {
												left: "100%",
											},
										},
									}}
								>
									Découvrir les Aventuriers
								</Button>

								<Button
									component={RouterLink}
									to="/requetes"
									variant="outlined"
									size="large"
									startIcon={<QuestsIcon />}
									sx={{
										py: 1.5,
										px: 3,
										fontSize: "1rem",
										borderRadius: "10px",
										borderWidth: "2px",
										borderColor: alpha(theme.palette.primary.main, 0.5),
										color: theme.palette.primary.light,
										"&:hover": {
											borderColor: theme.palette.primary.main,
											backgroundColor: alpha(theme.palette.primary.main, 0.08),
											transform: "translateY(-3px)",
										},
									}}
								>
									Voir les Requêtes
								</Button>
							</Stack>
						</motion.div>
					</Box>

					{/* Hero image/illustration */}
					<Box
						sx={{
							width: { xs: "100%", md: "45%" },
							height: { xs: "300px", md: "450px" },
							position: "relative",
						}}
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
							style={{ width: "100%", height: "100%" }}
						>
							<Box
								component="img"
								src="/hero-image.png" // Remplacez par votre image d'aventuriers
								alt="Aventuriers en quête"
								sx={{
									width: "100%",
									height: "100%",
									objectFit: "contain",
									position: "relative",
									zIndex: 1,
								}}
								onError={(e) => {
									// Fallback si l'image n'existe pas
									e.currentTarget.src =
										"https://placehold.co/600x400/1e293b/cbd5e1?text=Aventuriers+en+action";
								}}
							/>

							{/* Effet de lueur derrière l'image */}
							<Box
								sx={{
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									width: "80%",
									height: "80%",
									borderRadius: "50%",
									background: `radial-gradient(circle, ${alpha(
										theme.palette.primary.main,
										0.2
									)} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`,
									filter: "blur(40px)",
									zIndex: 0,
								}}
							/>
						</motion.div>

						{/* Décorations flottantes */}
						{[...Array(4)].map((_, i) => (
							<motion.div
								key={i}
								initial={{ x: 0, y: 0 }}
								animate={{
									x: [0, Math.random() * 20 - 10, 0],
									y: [0, Math.random() * 20 - 10, 0],
								}}
								transition={{
									duration: 4 + i,
									repeat: Infinity,
									ease: "easeInOut",
								}}
								style={{
									position: "absolute",
									width: 60 - i * 10,
									height: 60 - i * 10,
									borderRadius: "50%",
									background: `radial-gradient(circle, ${alpha(
										i % 2 === 0
											? theme.palette.primary.main
											: theme.palette.secondary.main,
										0.15
									)} 0%, transparent 70%)`,
									top: `${20 + i * 20}%`,
									left: `${i * 25}%`,
									filter: "blur(8px)",
									zIndex: 2,
								}}
							/>
						))}
					</Box>
				</Stack>
			</Container>
		</Box>
	);
}
