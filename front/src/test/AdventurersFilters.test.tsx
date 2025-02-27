import { ThemeProvider, createTheme } from "@mui/material/styles";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import AdventurersFilters from "../components/ui/AdventurersFilters";

// Création du thème pour le test
const theme = createTheme();

// Fonction pour rendre le composant avec le ThemeProvider et MemoryRouter
const renderFilters = (
	archetypes = ["Guerrier", "Mage", "Assassin"],
	count = 10
) =>
	render(
		<MemoryRouter>
			<ThemeProvider theme={theme}>
				<AdventurersFilters
					archetypes={archetypes}
					count={count}
					refetch={() => {}}
				/>
			</ThemeProvider>
		</MemoryRouter>
	);

describe("AdventurersFilters Component", () => {
	beforeEach(() => {
		document.body.innerHTML = ""; // Réinitialise le DOM avant chaque test
	});

	it("doit afficher la barre de recherche, les filtres et les boutons de tri", () => {
		renderFilters();
		expect(
			screen.getByPlaceholderText("Rechercher un aventurier...")
		).toBeInTheDocument();
		expect(screen.getByText("Filtrer les aventuriers")).toBeInTheDocument();
		expect(screen.getByText("Expérience")).toBeInTheDocument();
		expect(screen.getByText("Tarif")).toBeInTheDocument();
	});

	it("doit permettre la saisie dans la barre de recherche", () => {
		renderFilters();
		const searchInput = screen.getByPlaceholderText(
			"Rechercher un aventurier..."
		);
		fireEvent.change(searchInput, { target: { value: "Guerrier" } });
		expect(searchInput).toHaveValue("Guerrier");
	});

	it("doit basculer le tri sur l'expérience", () => {
		renderFilters();
		const experienceButton = screen.getByText("Expérience");
		fireEvent.click(experienceButton);
		expect(experienceButton).toHaveClass("MuiButton-contained");
	});

	it("doit basculer le tri sur le tarif journalier", () => {
		renderFilters();
		const dailyRateButton = screen.getByText("Tarif");
		fireEvent.click(dailyRateButton);
		expect(dailyRateButton).toHaveClass("MuiButton-contained");
	});

	it("doit afficher '0 aventurier' lorsque count est 0", () => {
		renderFilters(["Guerrier", "Mage"], 0);
		expect(screen.getByText("0 aventurier")).toBeInTheDocument();
	});
});
