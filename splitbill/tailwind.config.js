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
			"input-box-gray": "#2A2A2A",
			"button-gray": "#262626",
			"outline-gray": "#444343",
		},
		fontFamily: {
			sans: ["DM Sans"],
		},
	},
	plugins: [require("daisyui")],
};
