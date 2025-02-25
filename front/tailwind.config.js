/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: "#623CE7",
					50: "#F3F1FE",
					100: "#E7E3FD",
					200: "#D0C8FB",
					300: "#B8ADF9",
					400: "#A192F7",
					500: "#8977F5",
					600: "#715CF3",
					700: "#5A41F1",
					800: "#4226EF",
					900: "#2B0BED",
					950: "#2609D4",
				},
			},
		},
	},
	plugins: [],
};
