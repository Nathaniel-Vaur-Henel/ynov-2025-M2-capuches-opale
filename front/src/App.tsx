import { Button } from "@mui/material";
import { useState } from "react";
import { RootLayout } from "./components/layout/RootLayout";

function App() {
	const [count, setCount] = useState(0);

	return (
		<RootLayout>
			<div className="flex flex-col items-center justify-center space-y-6">
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white">
					Vite + React
				</h1>
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
					<Button
						variant="contained"
						onClick={() => setCount((count) => count + 1)}
						className="mb-4"
					>
						count is {count}
					</Button>
					<p className="text-gray-600 dark:text-gray-300">
						Edit <code className="font-mono">src/App.tsx</code> and save to test
						HMR
					</p>
				</div>
			</div>
		</RootLayout>
	);
}

export default App;
