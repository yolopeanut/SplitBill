/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			...colors,
			"brand-orange": "#FF9A34",
			"background-black": "#1F1F1F",
			"background-gray": "#2A2A2A",
			"background-gray-dark": "#171717",
			"background-red": "#FF2626",
			"background-red-dark": "#E91515",

			"font-white": "#FFFFFF",
			"font-black": "#000000",
			"font-text-gray": "#969696",
			"font-gray-light": "#2C2C2C",
			"font-green": "#00FF84",
			"font-green-is-owed": "#1DFA00",
			"font-red": "#FF2626",
			"font-red-owes": "#F12525",
			"font-red-dark": "#E91515",

			"input-search-gray": "#333333",
			"input-box-gray": "#2A2A2A",

			"card-gray": "#333333",
			"card-gray-dark": "#2A2A2A",

			"button-gray": "#262626",

			"outline-gray": "#444343",
			"outline-red": "#F12020",
			"outline-white": "#FFFFFF",
		},
		fontFamily: {
			sans: ["DM Sans"],
		},
	},
	plugins: [require("daisyui"), require("@tailwindcss/forms")],

	daisyui: {
		themes: [],
	},
};
