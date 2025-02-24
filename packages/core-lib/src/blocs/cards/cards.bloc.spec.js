import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import cards200 from "../../../fixtures/cards-200.json";
import { configBloc } from "../config/config.bloc";
import { cardBloc } from "./card.bloc";
import { cardStore } from "./card.store";

vi.mock("axios");

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

describe("Cards BLoC", () => {

	beforeEach(() => {
		cardStore.setState({ cards: null });
		vi.clearAllMocks();
	});

	it("should get all cards", async () => {
		await configBloc.loadConfig();
		expect(fetch).toHaveBeenCalledWith("/config.json");

		cardStore.setState({ cards: null });

		vi.mocked(axios, true).get.mockResolvedValueOnce(cards200);
		const cards = await cardBloc.getAllCards();

		const firstCard = cards[0];
		expect(firstCard.idCard).toEqual("dp3-1");
		expect(firstCard.nameCard).toEqual("Ampharos");
		expect(firstCard.supertype).toEqual("Pokémon");
		expect(firstCard.level).toEqual("52");
		expect(firstCard.hp).toEqual("130");
	});
});
