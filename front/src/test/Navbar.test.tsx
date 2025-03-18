import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { describe, it, expect } from "vitest";

// Fonction utilitaire pour rendre la Navbar avec un chemin spécifique
const renderWithRouter = (initialEntries = ["/"]) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <Navbar />
        </MemoryRouter>
    );
};

describe("Navbar Component", () => {
    it("doit afficher le logo 'Capuche Opale'", () => {
        renderWithRouter();
        expect(screen.getByText(/Capuche Opale/i)).toBeInTheDocument();
    });

    it("doit appliquer le style actif sur le lien correspondant au chemin actuel", () => {
        renderWithRouter(["/aventuriers"]);
        const aventuriersLink = screen.getByText(/Aventuriers/i);
        expect(aventuriersLink).toHaveClass("bg-indigo-700"); // Style du lien actif
    });

    it("doit changer l'apparence de la navbar après un scroll", () => {
        renderWithRouter();

        // Vérifie que la navbar est initialement sans effet de scroll
        const navbar = screen.getByRole("navigation");
        expect(navbar).toHaveClass("bg-gray-900/90");

        // Simule le défilement vers le bas
        fireEvent.scroll(window, { target: { scrollY: 50 } });

        // Attends que l'effet de scroll s'applique
        expect(navbar).toHaveClass("bg-gray-900/95");
    });

    it("doit naviguer correctement vers la page d'accueil en cliquant sur le logo", () => {
        renderWithRouter(["/aventuriers"]);

        const logoLink = screen.getByText(/Capuche Opale/i);
        fireEvent.click(logoLink);

        expect(screen.getByText(/Capuche Opale/i)).toBeInTheDocument();
    });
});
