import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import RequestsFilters from "../components/ui/RequestsFilters";
const renderWithProviders = (initialEntries = ["/"]) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <RequestsFilters statuses={["PENDING", "SUCCESS", "FAILURE"]} count={5} />
            </QueryClientProvider>
        </MemoryRouter>
    );
};

describe("RequestsFilters Component", () => {
    it("doit afficher les champs de recherche et de sélection", () => {
        renderWithProviders();
        expect(screen.getByPlaceholderText(/Rechercher une requête/i)).toBeInTheDocument();
        expect(screen.getByText(/Tous les statuts/i)).toBeInTheDocument();
    });

    it("doit réinitialiser les filtres lorsque le bouton 'Réinitialiser' est cliqué", async () => {
        renderWithProviders(["/?search=Test&status=PENDING&sort=bounty"]);

        const resetButton = screen.getByText(/Réinitialiser/i);
        fireEvent.click(resetButton);

        await waitFor(() => {
            expect(window.location.search).toBe("");
        });
    });

    it("doit afficher le bon nombre de requêtes dans le compteur", () => {
        renderWithProviders();
        expect(screen.getByText(/5 requêtes/i)).toBeInTheDocument();
    });

    it("doit afficher le bouton 'Réinitialiser' uniquement si des filtres sont actifs", () => {
        renderWithProviders();
        expect(screen.queryByText(/Réinitialiser/i)).not.toBeInTheDocument();

        renderWithProviders(["/?search=Test"]);
        expect(screen.getByText(/Réinitialiser/i)).toBeInTheDocument();
    });
});
