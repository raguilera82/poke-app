import { Store } from "../store";
import type { Card } from "./card.model";

export type CardBlocState = {
	cards: Card[];
};

class CardStore extends Store<CardBlocState> {
	constructor() {
		super("poke_cards_state");
	}

	static _getInstance(): CardStore {
		return new CardStore();
	}
}

export const cardStore = CardStore._getInstance();
