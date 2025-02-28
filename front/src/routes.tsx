import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ApiDocs from "./ApiDocs.tsx";
import Layout from "./components/layout/Layout";
import Requests from "./components/pages/Requests.tsx";
import LazyWrapper from "./components/ui/LazyWrapper";

// Chargement paresseux des pages
const Home = lazy(() => import("./components/pages/Home"));
const Adventurers = lazy(() => import("./components/pages/Adventurers"));
const CreateAdventurerPage = lazy(() => import("./components/pages/createAdventurerPage"));
const CreateRequestPage = lazy(() => import("./components/pages/CreateRequestPage.tsx"));

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
						<Requests />
					</LazyWrapper>
				),
			},
			{
				path: "requetes/creer",
				element: (
					<LazyWrapper>
						<CreateRequestPage />
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
