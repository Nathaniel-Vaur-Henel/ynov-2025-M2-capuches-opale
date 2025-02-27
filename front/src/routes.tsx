import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LazyWrapper from "./components/ui/LazyWrapper";
import ApiDocs from "./ApiDocs.tsx";

// Chargement paresseux des pages
const Home = lazy(() => import("./components/pages/Home"));
const Adventurers = lazy(() => import("./components/pages/Adventurers"));
const Requests = lazy(() => import("./components/pages/Requests"));
const CreateRequestPage = lazy(() => import("./components/pages/CreateRequestPage"));

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
