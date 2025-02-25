import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import background from "../../assets/background-capuches-opale.webp";
import logo from "../../assets/logo-capuches-opale.png";
import themeMusic from "../../assets/theme-capuches-opale.mp3";

export default function Home() {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isMusicPlaying, setIsMusicPlaying] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current
				.play()
				.then(() => {
					setIsMusicPlaying(true);
				})
				.catch((error) => {
					console.error("Lecture automatique bloquée :", error);
					setIsMusicPlaying(false);
				});
		}

		// Animation de l'apparition des éléments
		setIsAnimating(true);
	}, []);

	const toggleMusic = () => {
		if (audioRef.current) {
			if (isMusicPlaying) {
				audioRef.current.pause();
			} else {
				audioRef.current.play();
			}
			setIsMusicPlaying(!isMusicPlaying);
		}
	};

	return (
		<div
			className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 space-y-10 bg-cover bg-center"
			style={{ backgroundImage: `url(${background})` }}
		>
			{/* Effet de brume amélioré */}
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute inset-0 bg-black opacity-75"
					style={{
						maskImage:
							"radial-gradient(circle, rgba(0,0,0,0) 15%, rgba(0,0,0,1) 90%)",
					}}
				></div>
			</div>

			{/* Particules lumineuses */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="absolute h-1 w-1 bg-indigo-400 rounded-full opacity-70"
						style={{
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
							animationDelay: `${Math.random() * 5}s`,
							animation: "float 15s infinite ease-in-out",
						}}
					></div>
				))}
			</div>

			{/* Bouton contrôle audio */}
			<button
				onClick={toggleMusic}
				className="absolute top-20 right-6 bg-gray-800/80 hover:bg-gray-700/80 text-indigo-300 p-2 rounded-full z-10 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/20"
				aria-label={isMusicPlaying ? "Couper la musique" : "Jouer la musique"}
			>
				{isMusicPlaying ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15.536 8.464a5 5 0 010 7.072M12 18a6 6 0 01-6-6 6 6 0 0112 0 6 6 0 01-6 6z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19.071 5.929a9 9 0 010 12.142M7.929 5.929a9 9 0 00-2.122 9.172"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
							clipRule="evenodd"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
						/>
					</svg>
				)}
			</button>

			{/* Contenu principal avec animation */}
			<div
				className={`relative w-full max-w-3xl bg-gray-800/90 p-8 rounded-xl shadow-2xl border border-indigo-700/30 backdrop-blur-sm transition-all duration-700 ${
					isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
				}`}
			>
				<h1 className="text-6xl font-extrabold mb-6 text-center">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
						Bienvenue chez Les Capuches d'Opale
					</span>
				</h1>
				<p className="text-lg text-gray-300 leading-relaxed text-center mb-6">
					Nous sommes une guilde d'aventuriers en pleine expansion, regroupant
					archers, barbares, paladins, mages et bien d'autres talents.
					Rejoignez-nous pour explorer de nouvelles quêtes et forger votre
					légende !
				</p>

				<div className="flex justify-center mt-4 space-x-4 flex-wrap">
					<Link
						to="/aventuriers"
						className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center m-2 hover:scale-105 hover:shadow-indigo-600/20 hover:shadow-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
								clipRule="evenodd"
							/>
						</svg>
						Voir les Aventuriers
					</Link>
					<Link
						to="/requetes"
						className="bg-gray-700 hover:bg-gray-600 text-indigo-300 hover:text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center m-2 hover:scale-105 hover:shadow-indigo-600/20 hover:shadow-xl"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
								clipRule="evenodd"
							/>
						</svg>
						Parcourir les Requêtes
					</Link>
				</div>
			</div>

			{/* Logo avec animation améliorée */}
			<div
				className={`relative flex justify-center mt-8 transition-all duration-1000 ${
					isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-90"
				}`}
			>
				<img
					src={logo}
					alt="Les Capuches d'Opale"
					className="h-48 drop-shadow-lg transition-all duration-500 hover:rotate-6 hover:scale-110"
				/>
				<div className="absolute -inset-4 bg-indigo-500/20 rounded-full filter blur-xl opacity-70 animate-pulse"></div>
			</div>

			{/* Musique */}
			<audio ref={audioRef} src={themeMusic} loop />
		</div>
	);
}
