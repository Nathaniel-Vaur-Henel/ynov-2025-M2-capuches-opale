import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

export function RootLayout() {
	return (
		<div className="min-h-screen px-6">
			<Navbar />
			<main className="pt-16 w-full h-full">
				<Outlet />
			</main>
		</div>
	);
}
