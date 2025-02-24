import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

export function RootLayout() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<main className="pt-16 px-4">
				<div className="max-w-7xl mx-auto py-6">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
