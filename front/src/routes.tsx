import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LazyWrapper from "./components/ui/LazyWrapper";
import ApiDocs from "./ApiDocs.tsx";

// Chargement paresseux des pages
const Home = lazy(() => import("./components/pages/Home"));
const Adventurers = lazy(() => import("./components/pages/Adventurers"));
const CreateAdventurerPage = lazy(() => import("./components/pages/createAdventurerPage"));

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
				path: "aventuriers/creer",
				element: (
					<LazyWrapper>
						<CreateAdventurerPage />
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
			{
				path: "api-docs",
				element: <ApiDocs />,
			},
		],
	},
]);
