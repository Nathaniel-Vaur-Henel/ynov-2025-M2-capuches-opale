import { alpha } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Palette de couleurs moderne et harmonieuse
const colors = {
	dark: {
		900: "#030712", // Noir profond
		800: "#0F172A", // Bleu très foncé
		700: "#1E293B", // Slate foncé
	},
	indigo: {
		300: "#A5B4FC",
		400: "#818CF8",
		500: "#6366F1",
		600: "#4F46E5",
		700: "#4338CA",
	},
	purple: {
		300: "#C4B5FD",
		400: "#A78BFA",
		500: "#8B5CF6",
		600: "#7C3AED",
	},
	slate: {
		50: "#F8FAFC",
		100: "#F1F5F9",
		200: "#E2E8F0",
		300: "#CBD5E1",
		400: "#94A3B8",
		500: "#64748B",
		600: "#475569",
		700: "#334155",
		800: "#1E293B",
		900: "#0F172A",
	},
};

// Création du thème de base
let theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: colors.indigo[500],
			light: colors.indigo[300],
			dark: colors.indigo[700],
		},
		secondary: {
			main: colors.purple[500],
			light: colors.purple[300],
			dark: colors.purple[600],
		},
		background: {
			default: colors.dark[900],
			paper: colors.dark[800],
		},
		text: {
			primary: colors.slate[100],
			secondary: colors.slate[300],
		},
		divider: alpha(colors.slate[600], 0.6),
	},
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h1: {
			fontWeight: 800,
			fontSize: "2.75rem",
			lineHeight: 1.3,
			letterSpacing: "-0.02em",
		},
		h2: {
			fontWeight: 700,
			fontSize: "2.25rem",
			lineHeight: 1.35,
			letterSpacing: "-0.01em",
		},
		h3: {
			fontWeight: 700,
			fontSize: "1.875rem",
			lineHeight: 1.4,
		},
		h4: {
			fontWeight: 700,
			fontSize: "1.5rem",
			lineHeight: 1.4,
		},
		h5: {
			fontWeight: 600,
			fontSize: "1.25rem",
			lineHeight: 1.5,
		},
		h6: {
			fontWeight: 600,
			fontSize: "1.125rem",
			lineHeight: 1.5,
		},
		subtitle1: {
			fontSize: "1rem",
			lineHeight: 1.6,
			letterSpacing: "0.0075em",
		},
		subtitle2: {
			fontSize: "0.875rem",
			fontWeight: 500,
			lineHeight: 1.6,
			letterSpacing: "0.00714em",
		},
		body1: {
			fontSize: "1rem",
			lineHeight: 1.6,
			letterSpacing: "0.00938em",
		},
		body2: {
			fontSize: "0.875rem",
			lineHeight: 1.6,
			letterSpacing: "0.01071em",
		},
		button: {
			fontWeight: 600,
			fontSize: "0.875rem",
			letterSpacing: "0.02857em",
			lineHeight: 1.75,
			textTransform: "none",
		},
	},
	shape: {
		borderRadius: 12,
	},
	shadows: [
		"none",
		"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
		"0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)",
		"0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)",
		"0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)",
		"0 20px 40px rgba(0,0,0,0.2)",
		// Ajouter les 19 autres ombres requises
		"0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
		"0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
		"0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
		"0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
		"0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
		"0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
		"0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
		"0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
		"0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
		"0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
		"0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
		"0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
		"0px 13px 19px -8px rgba(0,0,0,0.2),0px 26px 43px 3px rgba(0,0,0,0.14),0px 10px 49px 9px rgba(0,0,0,0.12)",
		"0px 14px 21px -8px rgba(0,0,0,0.2),0px 28px 48px 3px rgba(0,0,0,0.14),0px 10px 52px 9px rgba(0,0,0,0.12)",
		"0px 14px 23px -9px rgba(0,0,0,0.2),0px 30px 51px 3px rgba(0,0,0,0.14),0px 10px 54px 10px rgba(0,0,0,0.12)",
		"0px 15px 25px -9px rgba(0,0,0,0.2),0px 32px 54px 3px rgba(0,0,0,0.14),0px 11px 56px 10px rgba(0,0,0,0.12)",
		"0px 16px 27px -10px rgba(0,0,0,0.2),0px 34px 57px 3px rgba(0,0,0,0.14),0px 11px 58px 10px rgba(0,0,0,0.12)",
		"0px 17px 29px -10px rgba(0,0,0,0.2),0px 36px 60px 3px rgba(0,0,0,0.14),0px 11px 60px 10px rgba(0,0,0,0.12)",
		"0px 18px 31px -10px rgba(0,0,0,0.2),0px 38px 63px 3px rgba(0,0,0,0.14),0px 12px 62px 10px rgba(0,0,0,0.12)",
	],
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					backgroundImage: "none",
					backgroundColor: colors.dark[900],
					scrollbarWidth: "thin",
					"&::-webkit-scrollbar": {
						width: "8px",
						height: "8px",
					},
					"&::-webkit-scrollbar-thumb": {
						backgroundColor: alpha(colors.slate[400], 0.2),
						borderRadius: "4px",
					},
					"&::-webkit-scrollbar-track": {
						backgroundColor: alpha(colors.dark[800], 0.6),
					},
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: alpha(colors.dark[900], 0.8),
					backgroundImage: "none",
					boxShadow: "none",
				},
			},
		},
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: alpha(colors.dark[800], 0.95),
					backgroundImage: "none",
					borderRight: `1px solid ${alpha(colors.slate[700], 0.2)}`,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
					backgroundColor: alpha(colors.dark[800], 0.5),
					boxShadow: `0 0 0 1px ${alpha(colors.slate[700], 0.15)}`,
					"&.MuiPopover-paper": {
						backgroundColor: alpha(colors.dark[800], 0.9),
						backdropFilter: "blur(8px)",
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					boxShadow: "none",
					borderRadius: "10px",
					textTransform: "none",
					fontWeight: 600,
					"&:hover": {
						boxShadow: "none",
					},
				},
				contained: {
					"&:hover": {
						boxShadow: `0 8px 16px ${alpha(colors.indigo[600], 0.25)}`,
						transform: "translateY(-1px)",
					},
				},
				outlined: {
					borderColor: alpha(colors.slate[600], 0.5),
					"&:hover": {
						borderColor: colors.indigo[500],
						backgroundColor: alpha(colors.indigo[500], 0.08),
					},
				},
				containedPrimary: {
					backgroundImage: `linear-gradient(135deg, ${colors.indigo[500]} 0%, ${colors.indigo[600]} 100%)`,
					"&:hover": {
						backgroundImage: `linear-gradient(135deg, ${colors.indigo[600]} 0%, ${colors.indigo[700]} 100%)`,
					},
				},
				containedSecondary: {
					backgroundImage: `linear-gradient(135deg, ${colors.purple[500]} 0%, ${colors.purple[600]} 100%)`,
					"&:hover": {
						backgroundImage: `linear-gradient(135deg, ${
							colors.purple[600]
						} 0%, ${alpha(colors.purple[600], 0.9)} 100%)`,
					},
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					"&.Mui-focused": {
						boxShadow: `0 0 0 2px ${alpha(colors.indigo[500], 0.25)}`,
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: "10px",
					"&:hover .MuiOutlinedInput-notchedOutline": {
						borderColor: alpha(colors.indigo[500], 0.4),
					},
					"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
						borderColor: colors.indigo[500],
					},
				},
				notchedOutline: {
					borderColor: alpha(colors.slate[600], 0.3),
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: "8px",
					fontWeight: 500,
					"&.MuiChip-colorPrimary": {
						backgroundColor: alpha(colors.indigo[500], 0.2),
						color: colors.indigo[300],
					},
					"&.MuiChip-colorSecondary": {
						backgroundColor: alpha(colors.purple[500], 0.2),
						color: colors.purple[300],
					},
				},
			},
		},
		MuiAlert: {
			styleOverrides: {
				standardError: {
					backgroundColor: "rgba(211, 47, 47, 0.1)",
					color: "#ff8a80",
				},
				standardWarning: {
					backgroundColor: "rgba(237, 108, 2, 0.1)",
					color: "#ffab40",
				},
				standardInfo: {
					backgroundColor: "rgba(2, 136, 209, 0.1)",
					color: "#80d8ff",
				},
				standardSuccess: {
					backgroundColor: "rgba(46, 125, 50, 0.1)",
					color: "#b9f6ca",
				},
			},
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					borderRadius: "8px",
					"&.Mui-selected": {
						backgroundColor: alpha(colors.indigo[500], 0.2),
						color: colors.indigo[300],
					},
				},
			},
		},
		MuiLinearProgress: {
			styleOverrides: {
				root: {
					backgroundColor: alpha(colors.indigo[500], 0.2),
					color: colors.indigo[300],
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: alpha(colors.dark[800], 0.9),
					backdropFilter: "blur(8px)",
					border: `1px solid ${alpha(colors.slate[700], 0.3)}`,
					borderRadius: 8,
					boxShadow: `0 4px 12px ${alpha(colors.dark[900], 0.5)}`,
					padding: "8px 12px",
					fontSize: "0.85rem",
				},
				arrow: {
					color: alpha(colors.dark[800], 0.9),
				},
			},
		},
	},
});

// Ajouter les composants personnalisés manquants
theme = createTheme(theme, {
	components: {
		// Résoudre le problème de MuiBox
		MuiBox: {
			styleOverrides: {
				root: {
					backgroundColor: "transparent",
				},
			},
		},
		MuiContainer: {
			styleOverrides: {
				root: {
					backgroundColor: "transparent",
				},
			},
		},
	},
});

// Rendre les tailles de police responsives
theme = responsiveFontSizes(theme);

export default theme;
