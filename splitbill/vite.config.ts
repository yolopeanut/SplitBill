import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		watch: {
			usePolling: true,
			interval: 100, // Polling interval in milliseconds
			ignored: ["**/node_modules/**", "**/.git/**"], // Ignore watching these directories
		},
	},
	plugins: [
		react(),
		VitePWA({
			devOptions: {
				enabled: true,
				type: "module",
			},
			registerType: "autoUpdate",
			injectRegister: "auto",
			manifest: {
				name: "Split Bill",
				short_name: "Split Bill",
				description: "Save your time splitting bills with your friends",
				theme_color: "#000000",
				start_url: "/",
				display: "standalone",
				prefer_related_applications: false,
				orientation: "portrait",
				background_color: "#000000",

				icons: [
					{
						src: "/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa-maskable-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "maskable",
					},
					{
						src: "/pwa-maskable-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				screenshots: [
					{
						src: "/pwa-screenshot-600x900.png",
						sizes: "600x900",
						type: "image/png",
						label: "Split Bill",
					},
					{
						src: "/pwa-screenshot-600x900-2.png",
						sizes: "600x900",
						type: "image/png",
						form_factor: "wide",
						label: "Split Bill",
					},
				],
				display_override: ["standalone"],
			},
		}),
	],
});
