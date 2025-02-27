import {
	PeopleAlt as AdventurersIcon,
	ArrowForward,
	Pause,
	PlayArrow,
	Assignment as QuestsIcon,
	VolumeOff,
	VolumeUp,
} from "@mui/icons-material";
import {
	alpha,
	Box,
	Button,
	Chip,
	Container,
	Fade,
	IconButton,
	Paper,
	Slider,
	Stack,
	Typography,
	useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Hero() {
	const theme = useTheme();
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(70);
	const [isMuted, setIsMuted] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume / 100;
		}
	}, [volume]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.muted = isMuted;
		}
	}, [isMuted]);

	const togglePlay = () => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
		setVolume(newValue as number);
	};

	const toggleMute = () => {
		setIsMuted(!isMuted);
	};

	return (
		<Box
			component="section"
			sx={{
				position: "relative",
				overflow: "hidden",
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				py: { xs: 8, md: 12 },
				backgroundImage: "url('/background-capuches-opale.webp')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundAttachment: "fixed",
				"&::before": {
					content: '""',
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: "rgba(3, 7, 18, 0.85)",
					zIndex: 1,
				},
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
					opacity: 0.4,
				}}
			>
				{[...Array(10)].map((_, i) => (
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
								0.6
							)}, ${alpha(theme.palette.primary.main, 0)})`,
							filter: "blur(8px)",
						}}
					/>
				))}
			</Box>

			{/* Main content */}
			<Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
				<Stack
					direction={{ xs: "column", md: "row" }}
					spacing={{ xs: 6, md: 10 }}
					alignItems="center"
					justifyContent="space-between"
				>
					<Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
						<Fade in={true} timeout={1000}>
							<Box>
								<Chip
									label="Guilde d'aventuriers"
									color="primary"
									size="small"
									sx={{
										mb: 2,
										fontWeight: 600,
										backdropFilter: "blur(4px)",
										backgroundColor: alpha(theme.palette.primary.main, 0.2),
									}}
								/>

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
									Les Capuches d'Opale
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
										lineHeight: 1.8,
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
												backgroundColor: alpha(
													theme.palette.primary.main,
													0.08
												),
												transform: "translateY(-3px)",
											},
										}}
									>
										Voir les Requêtes
									</Button>
								</Stack>
							</Box>
						</Fade>
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
								src="/logo-capuches-opale.png"
								alt="Les Capuches d'Opale"
								sx={{
									width: "100%",
									height: "100%",
									objectFit: "contain",
									position: "relative",
									zIndex: 1,
								}}
								onError={(e) => {
									e.currentTarget.src =
										"https://placehold.co/600x400/1e293b/cbd5e1?text=Capuches+d'Opale";
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
					</Box>
				</Stack>

				{/* Audio player */}
				<Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
					<audio ref={audioRef} src="/theme-capuches-opale.mp3" loop />

					<Paper
						elevation={0}
						sx={{
							p: 2,
							borderRadius: 3,
							backgroundColor: alpha(theme.palette.background.paper, 0.6),
							backdropFilter: "blur(10px)",
							border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
							maxWidth: "400px",
							width: "100%",
						}}
					>
						<Stack direction="row" spacing={2} alignItems="center">
							<IconButton
								onClick={togglePlay}
								color="primary"
								sx={{
									backgroundColor: alpha(theme.palette.primary.main, 0.2),
									"&:hover": {
										backgroundColor: alpha(theme.palette.primary.main, 0.3),
									},
								}}
							>
								{isPlaying ? <Pause /> : <PlayArrow />}
							</IconButton>

							<IconButton onClick={toggleMute} color="primary">
								{isMuted ? <VolumeOff /> : <VolumeUp />}
							</IconButton>

							<Slider
								value={volume}
								onChange={handleVolumeChange}
								aria-labelledby="volume-slider"
								sx={{ width: "150px" }}
							/>

							<Typography variant="body2" color="text.secondary">
								Thème musical
							</Typography>
						</Stack>
					</Paper>
				</Box>

				{/* Call to action */}
				<Box sx={{ mt: 8, textAlign: "center" }}>
					<Button
						component={RouterLink}
						to="/aventuriers"
						variant="contained"
						endIcon={<ArrowForward />}
						size="large"
						sx={{
							py: 1.5,
							px: 4,
							borderRadius: "12px",
							background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
							boxShadow: `0 10px 20px ${alpha(
								theme.palette.primary.main,
								0.3
							)}`,
							"&:hover": {
								boxShadow: `0 15px 30px ${alpha(
									theme.palette.primary.main,
									0.4
								)}`,
								transform: "translateY(-2px)",
							},
						}}
					>
						Commencer l'aventure
					</Button>
				</Box>
			</Container>
		</Box>
	);
}
