import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		chunkSizeWarningLimit: 800,
		rollupOptions: {
			output: {
				manualChunks: {
					mui: ["@mui/material", "@mui/icons-material", "@mui/system"],
					vendor: ["react", "react-dom", "react-router-dom"],
					tanstack: ["@tanstack/react-query"],
				},
			},
		},
	},
	test: {
		environment: "jsdom",
		setupFiles: "./src/setupTests.js",
		globals: true,
	},

});
