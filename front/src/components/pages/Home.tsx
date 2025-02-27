import { alpha, Box, Container, useTheme } from "@mui/material";
import Hero from "../ui/Hero"; // Assurez-vous que ce chemin est correct

export default function Home() {
	const theme = useTheme();

	return (
		<Box
			sx={{
				backgroundColor: "transparent",
				backgroundImage: `linear-gradient(to bottom, ${alpha(
					theme.palette.background.default,
					0.9
				)}, ${theme.palette.background.default})`,
				minHeight: "100vh",
			}}
		>
			{/* Hero section */}
			<Hero />

			{/* Contenu principal avec fond transparent */}
			<Container
				maxWidth="xl"
				sx={{
					pt: 8,
					pb: 12,
					position: "relative",
				}}
			>
				{/* Autres composants de votre page d'accueil */}
			</Container>
		</Box>
	);
}
