import { FaClipboardList, FaHome, FaUsers } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
	const location = useLocation();

	const isActivePath = (path: string) => location.pathname === path;

	const navItems = [
		{ path: "/aventuriers", label: "Aventuriers", icon: <FaUsers /> },
		{ path: "/requetes", label: "Requêtes", icon: <FaClipboardList /> },
	];

	return (
		<nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-lg z-50 opacity-80">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center">
						<FaHome className="h-6 w-6 text-white" />
						<span className="ml-2 text-xl font-semibold text-white tracking-wide">
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
									flex items-center px-3 py-2 rounded-md
									text-sm font-medium transition-colors duration-200
									${
										isActivePath(path)
											? "bg-gray-800 text-white"
											: "text-gray-300 hover:bg-gray-700 hover:text-white"
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

			{/* Subtle accent line */}
			<div className="h-[2px] bg-primary/50" />
		</nav>
	);
}
