import {
	ChevronRight as ChevronRightIcon,
	Home as HomeIcon,
} from "@mui/icons-material";
import {
	Box,
	Link,
	Breadcrumbs as MuiBreadcrumbs,
	Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const routeLabels: Record<string, string> = {
	aventuriers: "Aventuriers",
	requetes: "Requêtes",
	details: "Détails",
};

export default function Breadcrumbs() {
	const location = useLocation();

	// Ignorer la page d'accueil
	if (location.pathname === "/") return null;

	const pathnames = location.pathname.split("/").filter((x) => x);

	return (
		<Box className="py-2 px-4 bg-transparent text-gray-400">
			<MuiBreadcrumbs
				separator={
					<ChevronRightIcon
						fontSize="small"
						className="text-slate-400 opacity-70"
					/>
				}
				aria-label="breadcrumb"
				className="mb-6"
			>
				<Link
					component={RouterLink}
					to="/"
					color="inherit"
					className="flex items-center text-slate-400 transition-colors hover:text-indigo-400"
				>
					<HomeIcon className="mr-1 text-lg" />
					Accueil
				</Link>

				{pathnames.map((value, index) => {
					const last = index === pathnames.length - 1;
					const to = `/${pathnames.slice(0, index + 1).join("/")}`;
					const label = routeLabels[value] || value;

					return last ? (
						<Typography key={to} color="text.primary" className="font-medium">
							{label}
						</Typography>
					) : (
						<Link
							component={RouterLink}
							to={to}
							key={to}
							color="inherit"
							className="text-slate-400 transition-colors hover:text-indigo-400"
						>
							{label}
						</Link>
					);
				})}
			</MuiBreadcrumbs>
		</Box>
	);
}
