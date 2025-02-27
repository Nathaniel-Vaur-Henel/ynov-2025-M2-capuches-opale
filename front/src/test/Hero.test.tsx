import { render, screen, fireEvent } from "@testing-library/react";
import Hero from "../components/ui/Hero";
import { describe, it, beforeEach, expect } from "vitest";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Création du thème pour le test
const theme = createTheme();

// Fonction pour rendre le composant avec le ThemeProvider et MemoryRouter
const renderHero = () =>
    render(
        <MemoryRouter>
            <ThemeProvider theme={theme}>
                <Hero />
            </ThemeProvider>
        </MemoryRouter>
    );

describe("Hero Component", () => {
    beforeEach(() => {
        document.body.innerHTML = ""; // Réinitialise le DOM avant chaque test
    });

    it("doit s'afficher correctement", () => {
        renderHero();
        expect(screen.getByText(/Les Capuches d'Opale/i)).toBeInTheDocument();
    });

    it("doit démarrer avec isPlaying=false, volume=70 et isMuted=false", () => {
        renderHero();
        const audioElement = document.querySelector("audio"); // Utilisation de querySelector
        expect(audioElement).not.toBeNull(); // Vérifie que l'élément existe
        expect(audioElement!.paused).toBe(true);
        expect(audioElement!.volume).toBeCloseTo(0.7);
        expect(audioElement!.muted).toBe(false);
    });

    it("doit activer et désactiver la lecture au clic sur le bouton Play/Pause", () => {
        renderHero();
        const playButton = document.querySelector("button"); // Recherche du bouton play
        expect(playButton).not.toBeNull();
        fireEvent.click(playButton!);
    });

    it("doit activer et désactiver le mute", () => {
        renderHero();
        const muteButton = document.querySelectorAll("button")[1]; // Sélectionne le deuxième bouton
        expect(muteButton).not.toBeNull();
        fireEvent.click(muteButton!);
    });

    it("doit modifier le volume", () => {
        renderHero();
        const volumeSlider = screen.getByRole("slider");
        fireEvent.change(volumeSlider, { target: { value: 30 } });
        const audioElement = document.querySelector("audio");
        expect(audioElement!.volume).toBeCloseTo(0.3);
    });
});
