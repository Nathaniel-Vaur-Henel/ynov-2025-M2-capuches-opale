import { Box, Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumbs from "../ui/Breadcrumbs";
import { ToastProvider } from "../ui/toast";
import Navbar from "./Navbar";

// Composant animé pour le fond

// Composant animé pour le fond
const BackgroundGradient = () => {
	return (
		<Box
			sx={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: -1,
				overflow: "hidden",
				"&::before": {
					content: '""',
					position: "absolute",
					width: "40%",
					height: "40%",
					top: "-10%",
					right: "-10%",
					background:
						"radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
					filter: "blur(50px)",
					borderRadius: "50%",
					animation: "float 20s infinite alternate ease-in-out",
				},
				"&::after": {
					content: '""',
					position: "absolute",
					width: "35%",
					height: "35%",
					bottom: "-5%",
					left: "-5%",
					background:
						"radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(15, 23, 42, 0) 70%)",
					filter: "blur(50px)",
					borderRadius: "50%",
					animation: "float 15s -5s infinite alternate-reverse ease-in-out",
				},
			}}
		/>
	);
};

export default function Layout() {
	const theme = useTheme();
	const location = useLocation();
	const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));
	const [showBackground, setShowBackground] = useState(true);

	// Effet pour contrôler l'affichage du fond animé
	useEffect(() => {
		const pathsWithoutBackground = ["/login", "/signup"];
		setShowBackground(!pathsWithoutBackground.includes(location.pathname));
	}, [location.pathname]);

	return (
		<ToastProvider>
			<div className="flex flex-col min-h-screen">
				{/* Fond animé */}
				{showBackground && <BackgroundGradient />}

				{/* Navbar */}
				<Navbar />

				{/* Contenu principal */}
				<main className="flex-grow mt-14 sm:mt-16 pt-2 sm:pt-4 pb-4 sm:pb-6">
					<Container
						maxWidth="xl"
						className={`${isSmScreen ? "px-2" : "px-3"}`}
					>
						<Breadcrumbs />
						<Outlet />
					</Container>
				</main>
			</div>
		</ToastProvider>
	);
}
