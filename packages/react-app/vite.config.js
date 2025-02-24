import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
			},
		}),
	],
	resolve: {
		alias: {
			"@core": path.resolve(__dirname, "./../../packages/core-lib-ts/src"),
			"@ui": path.resolve(__dirname, "./../../packages/ui-lib/src"),
		},
	},
});
