import { Box } from "@mui/material";

interface LogoProps {
	width?: number | string;
	height?: number | string;
}

const Logo = ({ width = "auto", height = 40 }: LogoProps) => {
	return (
		<Box
			component="img"
			src="/logo-capuches-opale.png"
			alt="Les Capuches d'Opale"
			sx={{
				width,
				height,
				objectFit: "contain",
			}}
		/>
	);
};

export default Logo;
