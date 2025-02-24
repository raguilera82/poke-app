import { beforeEach, describe, expect, it, vi } from "vitest";
import { configBloc } from "./config.bloc";
import { configStore } from "./config.store";

global.fetch = vi.fn(() =>
	Promise.resolve({
		ok: true,
		json: () =>
			Promise.resolve({
				apiBaseUrl: "https://api.pokemontcg.io/v2/",
				apiKey: "5281dd39-1063-449e-9e73-4dbca1993a52",
			}),
	}),
);

describe("ConfigBloc", () => {
	beforeEach(() => {
		fetch.mockClear();
	});

	it("should load config and update state", async () => {
		await configBloc.loadConfig();

		expect(fetch).toHaveBeenCalledWith("/config.json");

		const state = configStore.getState();
		expect(state.config).toEqual({
			apiBaseUrl: "https://api.pokemontcg.io/v2/",
			apiKey: "5281dd39-1063-449e-9e73-4dbca1993a52",
		});
	});
});
