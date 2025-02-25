import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

export function RootLayout() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<main className="">
					<Outlet />
			</main>
		</div>
	);
}
