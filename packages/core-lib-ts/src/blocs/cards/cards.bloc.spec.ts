import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import cards200 from "../../../fixtures/cards-200.json";
import config200 from "../../../fixtures/config-200.json";
import { configBloc } from "../config/config.bloc";
import { cardBloc } from "./card.bloc";
import { Card } from "./card.model";
import { cardStore } from "./card.store";

vi.mock("axios");

describe("Cards BLoC - Get all cards", () => {
	it("should get all cards", async () => {
		vi.mocked(axios, true).get.mockResolvedValueOnce(config200);
		await configBloc.loadConfig();

		vi.clearAllMocks();

		vi.mocked(axios, true).get.mockResolvedValueOnce(cards200);
		const cards = await cardBloc.getAllCards();

		const firstCard = cards[0];
		expect(firstCard.idCard).toEqual("dp3-1");
		expect(firstCard.nameCard).toEqual("Ampharos");
		expect(firstCard.supertype).toEqual("Pokémon");
		expect(firstCard.level).toEqual("52");
		expect(firstCard.hp).toEqual("130");
		expect(firstCard.imageCard).toEqual(
			"https://images.pokemontcg.io/dp3/1_hires.png",
		);

		const cachedCards = await cardBloc.getAllCards();

		expect(cachedCards).toEqual(cards);

		expect(axios.get).toHaveBeenCalledTimes(1);
	});
});

describe("CardBloc - filter by name", () => {
	const mockCards: Card[] = [
		new Card({
			idCard: "1",
			nameCard: "Pikachu",
			supertype: "Pokemon",
			level: "1",
			hp: "60",
			imageCard: "pikachu.jpg",
		}),
		new Card({
			idCard: "2",
			nameCard: "Charizard",
			supertype: "Pokemon",
			level: "1",
			hp: "120",
			imageCard: "charizard.jpg",
		}),
	];

	beforeEach(() => {
		cardStore.setState({ cards: mockCards, filteredCards: mockCards });
	});

	describe("filterByName", () => {
		it("should return all cards when name is empty", () => {
			cardBloc.filterByName("");
			const result = cardStore.getState().filteredCards;
			expect(result).toEqual(mockCards);
		});

		it("should return filtered cards by name case insensitive", () => {
			cardBloc.filterByName("pika");
			const result = cardStore.getState().filteredCards;
			expect(result).toHaveLength(1);
			expect(result[0].nameCard).toBe("Pikachu");
		});

		it("should return empty array when no matches found", () => {
			cardBloc.filterByName("Mewtwo");
			const result = cardStore.getState().filteredCards;
			expect(result).toHaveLength(0);
		});

		it("should handle case insensitive search", () => {
			cardBloc.filterByName("CHAR");
			const result = cardStore.getState().filteredCards;
			expect(result).toHaveLength(1);
			expect(result[0].nameCard).toBe("Charizard");
		});
	});
});
