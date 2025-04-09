import path from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [],
	resolve: {
		alias: {
			"@core": path.resolve(__dirname, "./../../packages/core-lib-ts/src"),
			"@ui": path.resolve(__dirname, "./../../packages/ui-lib/src"),
		},
	},
});
