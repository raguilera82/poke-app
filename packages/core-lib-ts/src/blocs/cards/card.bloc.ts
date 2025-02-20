import { Cache } from "../../common/decorators/cache";
import type { Card } from "./card.model";
import { cardStore } from "./card.store";
import { CardsRepository } from "./cards.repository";

class CardBloc {
	@Cache("poke_cards_cache")
	async getAllCards(): Promise<Card[]> {
		const cardsRepository = new CardsRepository();
		const cards = await cardsRepository.getAllCards();
		cardStore.setState({ cards });
		return cards;
	}
}

export const cardBloc = new CardBloc();
