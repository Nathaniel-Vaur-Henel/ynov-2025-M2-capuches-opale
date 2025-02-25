import { useEffect, useState } from "react";
import { FaClipboardList, FaHome, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
	const location = useLocation();
	const [scrolled, setScrolled] = useState(false);

	const isActivePath = (path: string) => location.pathname === path;

	const navItems = [
		{ path: "/aventuriers", label: "Aventuriers", icon: <FaUsers /> },
		{ path: "/requetes", label: "Requêtes", icon: <FaClipboardList /> },
	];

	// Effet de scroll pour changer l'apparence de la navbar
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled
					? "bg-gray-900/95 shadow-lg backdrop-blur-sm"
					: "bg-gray-900/90 backdrop-blur-sm"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center group">
						<div className="p-2 rounded-full bg-indigo-600/20 group-hover:bg-indigo-600/40 transition-colors duration-200">
							<FaHome className="h-5 w-5 text-indigo-400 group-hover:text-white transition-colors duration-200" />
						</div>
						<span className="ml-2 text-xl font-semibold text-white tracking-wide group-hover:text-indigo-300 transition-colors duration-200">
							Capuche Opale
						</span>
					</Link>

					{/* Navigation Links */}
					<div className="flex items-center space-x-4">
						{navItems.map(({ path, label, icon }) => (
							<Link
								key={path}
								to={path}
								className={`
									flex items-center px-4 py-2 rounded-md
									text-sm font-medium transition-all duration-200
									${
										isActivePath(path)
											? "bg-indigo-700 text-white shadow-md shadow-indigo-700/30"
											: "text-gray-300 hover:bg-gray-800 hover:text-indigo-300"
									}
								`}
							>
								<span className="mr-2">{icon}</span>
								{label}
							</Link>
						))}
					</div>
				</div>
			</div>

			{/* Accent line with pulsing animation */}
			<div className="h-[2px] bg-gradient-to-r from-indigo-800 via-indigo-500 to-indigo-800" />
		</nav>
	);
}
