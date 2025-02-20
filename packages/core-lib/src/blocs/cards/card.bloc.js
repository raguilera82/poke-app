import { BaseBloc } from "../base.bloc";
import { CardsRepository } from "./cards.repository";

/**
 * @typedef {Object} CardBlocState
 * @property {import("./card.model").CardType[]} cards
 */
class CardBloc extends BaseBloc {
	/**
	 *
	 * @returns {Promise<import("./card.model").CardType[]>}
	 */
	async getAllCards() {
		const cardsCache = this.getState()?.cards;
		if (cardsCache) {
			return cardsCache;
		}
		const cardsRepository = new CardsRepository();
		const cards = await cardsRepository.getAllCards();
		this.setState({ cards });
		return cards;
	}

	constructor() {
		super("poke_cards_state");
	}

	/**
	 * @returns {CardBloc}
	 */
	static _getInstance() {
		return new CardBloc();
	}
}

export const cardBloc = CardBloc._getInstance();
