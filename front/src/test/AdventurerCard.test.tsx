import { render, screen } from "@testing-library/react";
import AdventurerCard from "../components/ui/AdventurerCard";
import { describe, it, expect } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Création du thème pour le test
const theme = createTheme();

// Fonction pour rendre le composant avec le ThemeProvider
const renderAdventurerCard = (props) =>
    render(
        <ThemeProvider theme={theme}>
            <AdventurerCard {...props} />
        </ThemeProvider>
    );

describe("AdventurerCard Component", () => {
    const defaultProps = {
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

    it("doit afficher la bonne icône pour l'archétype", () => {
        renderAdventurerCard({ ...defaultProps, archetype: "Mage" });
        expect(screen.getByTestId("MageIcon")).toBeInTheDocument();
    });

    it("doit afficher l'avatar avec l'image fournie", () => {
        renderAdventurerCard(defaultProps);
        const avatar = screen.getByAltText(/Test Aventurier/i);
        expect(avatar).toHaveAttribute("src", "test-image-url");
    });
});
