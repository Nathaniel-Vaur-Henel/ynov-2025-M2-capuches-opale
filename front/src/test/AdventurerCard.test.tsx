import { render, screen } from "@testing-library/react";
import AdventurerCard from "../components/ui/AdventurerCard";
import { describe, it, expect } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";

// Création du thème pour le test
const theme = createTheme();

// Définition du type des props attendues par AdventurerCard
type AdventurerCardProps = {
    id: number;
    name: string;
    experience: number;
    archetype: string;
    dailyRate: number;
    image: string;
};

// Fonction pour rendre le composant avec le ThemeProvider et MemoryRouter
const renderAdventurerCard = (props: AdventurerCardProps) =>
    render(
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <AdventurerCard {...props} />
            </ThemeProvider>
        </MemoryRouter>
    );

describe("AdventurerCard Component", () => {
    const defaultProps: AdventurerCardProps = {
        id: 1,
        name: "Test Aventurier",
        experience: 500,
        archetype: "Guerrier",
        dailyRate: 100,
        image: "test-image-url",
    };

    it("doit s'afficher correctement avec les bonnes informations", () => {
        renderAdventurerCard(defaultProps);
        expect(screen.getByText(/Test Aventurier/i)).toBeInTheDocument();
        expect(screen.getByText(/Expérience/i)).toBeInTheDocument();
        const elements = screen.getAllByText(/Guerrier/i);
        expect(elements.length).toBeGreaterThan(0);
        expect(elements.some((el) => el.tagName.toLowerCase() === "span")).toBe(true);
        expect(screen.getByText(/100 PO/i)).toBeInTheDocument();
    });

    it("doit afficher le bon rang en fonction de l'expérience", () => {
        renderAdventurerCard({ ...defaultProps, experience: 300 });
        expect(screen.getByText(/Apprenti/i)).toBeInTheDocument();
    });

    it("doit afficher le bon taux journalier en PO", () => {
        renderAdventurerCard({ ...defaultProps, dailyRate: 200 });
        expect(screen.getByText(/200 PO/i)).toBeInTheDocument();
    });

    it("doit afficher l'avatar avec l'image fournie", () => {
        renderAdventurerCard(defaultProps);
        const avatar = screen.getByAltText(/Test Aventurier/i);
        expect(avatar).toHaveAttribute("src", "test-image-url");
    });

    it("doit contenir le bouton 'Consulter' avec le bon lien", () => {
        renderAdventurerCard(defaultProps);
        const consulterButton = screen.getByText(/Consulter/i);
        expect(consulterButton.closest("a")).toHaveAttribute("href", "/aventuriers/1");
    });
});
