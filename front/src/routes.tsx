import { createBrowserRouter } from "react-router-dom";
import ApiDocs from "./ApiDocs";
import Layout from "./components/layout/Layout";
import AdventurerFormPage from "./components/pages/AdventurerFormPage";
import AdventurerProfil from "./components/pages/AdventurerProfil";
import Adventurers from "./components/pages/Adventurers";
import CreateRequestPage from "./components/pages/CreateRequestPage";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";
import Requests from "./components/pages/Requests";
import LazyWrapper from "./components/ui/LazyWrapper";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <NotFound />,
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
				path: "aventuriers/:id",
				element: (
					<LazyWrapper>
						<AdventurerProfil />
					</LazyWrapper>
				),
			},
			{
				path: "aventuriers/:id/modifier",
				element: (
					<LazyWrapper>
						<AdventurerFormPage />
					</LazyWrapper>
				),
			},
			{
				path: "aventuriers/creer",
				element: (
					<LazyWrapper>
						<AdventurerFormPage />
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
			/* Route temporairement commentée - fichier RequestDetail manquant
			{
				path: "requetes/:id",
				element: (
					<LazyWrapper>
						<RequestDetail />
					</LazyWrapper>
				),
			},
			*/
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
