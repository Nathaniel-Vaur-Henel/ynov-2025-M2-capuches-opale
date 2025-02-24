import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export function RootLayout({ children }: PropsWithChildren) {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="min-h-screen bg-slate-100">
				<header className="bg-white shadow">
					<nav className="mx-auto max-w-7xl px-4 py-6">
						<h1 className="text-2xl font-bold text-gray-900">Capuche Opale</h1>
					</nav>
				</header>
				<main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
			</div>
		</QueryClientProvider>
	);
}
