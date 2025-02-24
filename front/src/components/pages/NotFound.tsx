import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-bold text-gray-900">404</h1>
				<p className="text-xl text-gray-600">Page non trouvée</p>
				<Link
					to="/"
					className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
				>
					Retour à l'accueil
				</Link>
			</div>
		</div>
	);
}
