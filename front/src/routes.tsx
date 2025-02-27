import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LazyWrapper from "./components/ui/LazyWrapper";

// Chargement paresseux des pages
const Home = lazy(() => import("./components/pages/Home"));
const Adventurers = lazy(() => import("./components/pages/Adventurers"));

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: (
					<LazyWrapper>
						<Home />
					</LazyWrapper>
				),
			},
			{
				path: "aventuriers",
				element: (
					<LazyWrapper>
						<Adventurers />
					</LazyWrapper>
				),
			},
			{
				path: "requetes",
				element: (
					<LazyWrapper>
						<div>Page des requêtes</div>
					</LazyWrapper>
				),
			},
		],
	},
]);
