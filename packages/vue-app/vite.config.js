import path from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) =>
						tag.startsWith("poke-") || tag.startsWith("ui-"),
				},
			},
			babel: {
				plugins: [
					["@babel/plugin-proposal-decorators", { legacy: true }],
					["@babel/plugin-proposal-class-properties", { legacy: true }],
				],
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
