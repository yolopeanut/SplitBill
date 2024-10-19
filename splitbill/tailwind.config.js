/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		colors: {
			"brand-orange": "#FF9A34",
			"background-black": "#1F1F1F",

			"font-white": "#FFFFFF",
			"font-black": "#000000",
			"font-text-gray": "#969696",
			"font-gray-light": "#2C2C2C",
			"font-green": "#00FF84",
			"font-red": "#FF2626",

			"input-search-gray": "#333333",
			"input-box-gray": "#2A2A2A",

			"card-gray": "#333333",
			"button-gray": "#262626",
			"outline-gray": "#444343",
		},
		fontFamily: {
			sans: ["DM Sans"],
		},
	},
	plugins: [require("daisyui")],
};
