import {
	Box,
	useTheme,
    Button,
	alpha,
} from "@mui/material";
import AdventurerForm from "../forms/createAdventurerForm";

export default function CreateAdventurerPage() {
	const theme = useTheme();


	return (
		<Box
			className="min-h-screen py-20"
			sx={{
				backgroundColor: "transparent",
				position: "relative",
				overflow: "hidden",
			}}
		>
			{/* Fond d'ambiance subtil */}
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
            <AdventurerForm />
            {/* Bouton de retour a la liste des aventuriers */}
            <Button
                variant="contained"
                color="primary"
                sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    m: 2,
                    zIndex: 10,
                }}
                href="/aventuriers"
            >
                Retour à la liste
            </Button>
		</Box>
	);
}
