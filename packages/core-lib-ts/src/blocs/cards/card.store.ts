import { createValtioStore } from "../store";
import type { Card } from "./card.model";

export type CardBlocState = {
	cards: ReadonlyArray<Card>;
	filteredCards: ReadonlyArray<Card>;
};

export const cardStore = createValtioStore<CardBlocState>(
	{ cards: [], filteredCards: [] },
	"poke_cards_state",
);
