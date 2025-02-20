import { createValtioStore } from "../store";
import type { Card } from "./card.model";

export type CardBlocState = {
	cards: Card[];
};

export const cardStore = createValtioStore<CardBlocState>(
	{ cards: [] },
	"poke_cards_state",
);
