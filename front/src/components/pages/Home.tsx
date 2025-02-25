import { useEffect, useRef } from "react";
import logo from "../../assets/logo-capuches-opale.png";
import background from "../../assets/background-capuches-opale.webp";
import themeMusic from "../../assets/theme-capuches-opale.mp3";

export default function Home() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error("Lecture automatique bloquée :", error);
            });
        }
    }, []);

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center px-6 space-y-10 bg-cover bg-center"
             style={{ backgroundImage: `url(${background})` }}>
            {/* Effet de brume accentué */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-black opacity-70"
                     style={{ maskImage: "radial-gradient(circle, rgba(0,0,0,0) 20%, rgba(0,0,0,0.9) 95%)" }}></div>
            </div>

            {/* Contenu */}
            <div
                className="relative w-full max-w-3xl bg-gray-800 bg-opacity-90 p-6 rounded-xl shadow-lg border border-gray-700 transform hover:scale-105 transition duration-500">
                <h1 className="text-6xl font-extrabold mb-6 text-indigo-400 drop-shadow-lg text-center">
                    Bienvenue chez <span className="text-indigo-500">Les Capuches d'Opale</span>
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed text-center">
                    Nous sommes une guilde d'aventuriers en pleine expansion, regroupant archers,
                    barbares, paladins, mages et bien d'autres talents. Rejoignez-nous pour explorer
                    de nouvelles quêtes et forger votre légende !
                </p>
            </div>

            {/* Logo avec animation */}
            <div className="relative flex justify-center">
                <img src={logo} alt="Les Capuches d'Opale"
                     className="h-40 drop-shadow-lg transition-transform duration-500 hover:rotate-6"/>
            </div>

            {/* Bouton pour rejoindre la guilde avec effet lumineux */}
            <div className="relative">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-xl font-semibold px-10 py-4 rounded-xl shadow-xl transition duration-300
        relative overflow-hidden before:absolute before:inset-0 before:bg-indigo-500 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left">
                    <span className="relative">Rejoindre la Guilde</span>
                </button>
            </div>

            {/* Ajout de la musique */}
            <audio ref={audioRef} src={themeMusic} autoPlay loop />
        </div>
    );
}
