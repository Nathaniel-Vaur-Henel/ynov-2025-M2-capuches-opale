import {
	Home as HomeIcon,
	Menu as MenuIcon,
	People as PeopleIcon,
	AssignmentOutlined as QuestsIcon,
} from "@mui/icons-material";
import {
	AppBar,
	Box,
	Button,
	Container,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Slide,
	Toolbar,
	Typography,
	useMediaQuery,
	useScrollTrigger,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";

// Helper pour masquer la navbar lors du défilement vers le bas
function HideOnScroll({ children }: { children: React.ReactElement }) {
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

export default function Navbar() {
	const theme = useTheme();
	const location = useLocation();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [drawerOpen, setDrawerOpen] = useState(false);

	const navItems = [
		{ path: "/", label: "Accueil", icon: <HomeIcon /> },
		{ path: "/aventuriers", label: "Aventuriers", icon: <PeopleIcon /> },
		{ path: "/requetes", label: "Requêtes", icon: <QuestsIcon /> },
	];

	const isActivePath = (path: string) => {
		if (path === "/" && location.pathname !== "/") return false;
		return location.pathname.startsWith(path);
	};

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	// Contenu du drawer mobile
	const drawerContent = (
		<Box sx={{ width: 280, pt: 2 }} role="presentation" onClick={toggleDrawer}>
			<Box sx={{ px: 2, pb: 2 }}>
				<Typography
					variant="h6"
					sx={{ fontWeight: 700, color: theme.palette.primary.main }}
				>
					Capuche Opale
				</Typography>
			</Box>
			<Divider />
			<List>
				{navItems.map((item) => {
					const isActive = isActivePath(item.path);
					return (
						<ListItem key={item.path} disablePadding>
							<ListItemButton
								component={RouterLink}
								to={item.path}
								selected={isActive}
								sx={{
									borderRadius: 2,
									mx: 1,
									my: 0.5,
									"&.Mui-selected": {
										backgroundColor: alpha(theme.palette.primary.main, 0.15),
										color: theme.palette.primary.light,
										"&:hover": {
											backgroundColor: alpha(theme.palette.primary.main, 0.25),
										},
									},
								}}
							>
								<ListItemIcon
									sx={{
										color: isActive ? theme.palette.primary.light : "inherit",
										minWidth: 40,
									}}
								>
									{item.icon}
								</ListItemIcon>
								<ListItemText
									primary={item.label}
									primaryTypographyProps={{
										fontWeight: isActive ? 600 : 400,
									}}
								/>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);

	return (
		<>
			<HideOnScroll>
				<AppBar
					position="sticky"
					sx={{
						background: "transparent",
						backdropFilter: "blur(10px)",
						borderBottom: (theme) =>
							`1px solid ${alpha(theme.palette.divider, 0.2)}`,
						transition: "all 0.3s ease",
					}}
				>
					<Container maxWidth="xl">
						<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
							<Box
								component={RouterLink}
								to="/"
								sx={{ textDecoration: "none" }}
							>
								<Logo height={40} />
							</Box>

							{isMobile ? (
								<>
									<IconButton
										color="inherit"
										aria-label="open drawer"
										edge="end"
										onClick={toggleDrawer}
									>
										<MenuIcon />
									</IconButton>
									<Drawer
										anchor="right"
										open={drawerOpen}
										onClose={toggleDrawer}
									>
										{drawerContent}
									</Drawer>
								</>
							) : (
								<Box sx={{ display: "flex", gap: 2 }}>
									{navItems
										.filter((item) => item.path !== "/")
										.map((item) => (
											<Button
												key={item.path}
												color="inherit"
												component={RouterLink}
												to={item.path}
												startIcon={item.icon}
												variant={isActivePath(item.path) ? "contained" : "text"}
												sx={{
													px: 2,
													py: 1,
													...(isActivePath(item.path)
														? {}
														: {
																"&:hover": {
																	backgroundColor: "rgba(255, 255, 255, 0.05)",
																},
														  }),
												}}
											>
												{item.label}
											</Button>
										))}
								</Box>
							)}
						</Toolbar>
					</Container>

					{/* Accent gradient bar */}
					<Box
						sx={{
							height: 2,
							background:
								"linear-gradient(90deg, rgba(99,102,241,0.8) 0%, rgba(139,92,246,0.8) 50%, rgba(99,102,241,0.8) 100%)",
							opacity: 0.8,
						}}
					/>
				</AppBar>
			</HideOnScroll>
		</>
	);
}
