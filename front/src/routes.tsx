import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import Aventuriers from "./components/pages/Aventuriers";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Requetes from "./components/pages/Requetes";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "aventuriers",
				element: <Aventuriers />,
			},
			{
				path: "requetes",
				element: <Requetes />,
			},
		],
	},
]);
