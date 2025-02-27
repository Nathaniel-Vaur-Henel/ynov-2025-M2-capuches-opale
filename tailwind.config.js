module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			animation: {
				"float-20s": "float 20s infinite alternate ease-in-out",
				"float-15s-reverse":
					"float 15s -5s infinite alternate-reverse ease-in-out",
			},
			backgroundImage: {
				"radial-gradient-indigo":
					"radial-gradient(circle, rgba(32, 32, 40, 0.15) 0%, rgba(10, 10, 15, 0) 70%)",
				"radial-gradient-purple":
					"radial-gradient(circle, rgba(35, 31, 40, 0.15) 0%, rgba(10, 10, 15, 0) 70%)",
			},
			colors: {
				"dark-bg": "#030712",
				"darker-bg": "#010409",
			},
		},
	},
	plugins: [],
};
