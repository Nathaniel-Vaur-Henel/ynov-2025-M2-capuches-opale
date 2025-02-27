import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/layout/RootLayout";
import Adventurers from "./components/pages/Adventurers";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Requests from "./components/pages/Requests";
import ApiDocs from "./ApiDocs.tsx";

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
				element: <Adventurers />,
			},
			{
				path: "requetes",
				element: <Requests />,
			},
			{
				path: "api-docs",
				element: <ApiDocs />,
			},
		],
	},
]);
