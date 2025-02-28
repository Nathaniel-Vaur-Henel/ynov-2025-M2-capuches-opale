import { createBrowserRouter } from "react-router-dom";
import ApiDocs from "./ApiDocs.tsx";
import Layout from "./components/layout/Layout";
import AdventurerFormPage from "./components/pages/AdventurerFormPage.tsx";
import Adventurers from "./components/pages/Adventurers.tsx";
import AdventurerProfil from "./components/pages/AdventurerProfil.tsx";
import CreateRequestPage from "./components/pages/CreateRequestPage.tsx";
import Home from "./components/pages/Home.tsx";
import Requests from "./components/pages/Requests.tsx";
import LazyWrapper from "./components/ui/LazyWrapper";

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
				path: "aventuriers/:id",
				element: (
					<LazyWrapper>
						<AdventurerProfil />
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
				path: "aventuriers/modifier/:id",
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
