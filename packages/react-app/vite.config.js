import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@core": path.resolve(__dirname, "./../../packages/core-lib-ts/src"),
			"@core-ui": path.resolve(__dirname, "./../../packages/core-ui/src"),
		},
	},
});
