export default function Adventurers() {
	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold text-gray-900">Aventuriers</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* Placeholder pour la liste des aventuriers */}
				<div className="bg-white p-6 rounded-lg shadow-md">
					<h2 className="text-xl font-semibold mb-2">Aventurier 1</h2>
					<p className="text-gray-600">Description de l'aventurier...</p>
				</div>
			</div>
		</div>
	);
}
