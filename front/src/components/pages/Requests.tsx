import {
    Button
} from "@mui/material";
export default function Requests() {
	return (
		<div className="space-y-6">
			<h1 className="text-3xl font-bold text-gray-900">Requêtes</h1>
			<Button
						variant="contained"
						color="primary"
						sx={{
						position: "absolute",
						top: 50,
						right: 0,
						m: 2,
						zIndex: 10,
						}}
						href="requetes/creer"
					>
						Créer une requête
					</Button>
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<div className="p-6 space-y-4">
					{/* Placeholder pour la liste des requêtes */}
					
					<div className="border-b pb-4">
						<h2 className="text-xl font-semibold mb-2">Requête 1</h2>
						<p className="text-gray-600">Description de la requête...</p>
					</div>
				</div>
			</div>
		</div>
	);
}
