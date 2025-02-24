import { cardStore } from './card.store';
import { FilterCardsByNameUseCase } from './usecases/filter-cards-by-name.usecase';
import { GetAllCardsUseCase } from './usecases/get-all-cards.usecase';

/**
 * @typedef {Object} CardBlocState
 * @property {import("./card.model").Card[]} cards
 */
class CardBloc {
    /**
     * @returns {Promise<import("./card.model").Card[]>}
     */

    //@withCache('pokemon_cards', 60)
    async getAllCards() {
        const cards = await GetAllCardsUseCase.run();
        cardStore.setState({ cards });
        return cards;
    }

    filterByName(name) {
        const { cards } = cardStore.getState();
        return FilterCardsByNameUseCase.run(cards, name);
    }

    get store() {
        return cardStore;
    }

}

export const cardBloc = new CardBloc();
