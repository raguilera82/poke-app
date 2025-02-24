import { cardStore } from './card.store';
import { CardsRepository } from "./cards.repository";

/**
 * @typedef {Object} CardBlocState
 * @property {import("./card.model").Card[]} cards
 */
class CardBloc {
	/**
	 *
	 * @returns {Promise<import("./card.model").Card[]>}
	 */

	async getAllCards() {
		const cardsCache = cardStore.getState()?.cards;
		if (cardsCache) {
			return cardsCache;
		}
		const cardsRepository = new CardsRepository();
		const cards = await cardsRepository.getAllCards();
		cardStore.setState({ cards });
		return cards;
	}

	filterByName(name) {
		const { cards } = cardStore.getState();
		return FilterCardsByNameUseCase.run(cards, name);
	}

}

export const cardBloc = new CardBloc();
