import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { MotionConfig } from "framer-motion";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import darkTheme from "./theme"; // Assurez-vous que cela pointe vers theme.ts

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			{/* Configuration globale des animations pour plus de fluidité */}
			<MotionConfig reducedMotion="user">
				<div className="app-container relative min-h-screen overflow-hidden">
					{/* Vignette effect for depth */}
					<div
						className="pointer-events-none absolute inset-0 z-10"
						style={{
							background:
								"radial-gradient(circle at center, transparent 0%, rgba(3, 7, 18, 0.4) 100%)",
						}}
					/>
					<RouterProvider router={router} />
				</div>
			</MotionConfig>
		</ThemeProvider>
	);
}

export default App;
