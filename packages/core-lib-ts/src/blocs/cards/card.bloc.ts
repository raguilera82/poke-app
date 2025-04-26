import type { Card } from "./card.model";
import { cardStore } from "./card.store";
import { Filters } from "./filters.model";
import { FilterCardsByNameUseCase } from "./usecases/filter-cards-by-name.usecase";
import { GetAllCardsUseCase } from "./usecases/get-all-cards.usecase";

class CardBloc {
	//@Cache("poke_cards_cache")
	async getAllCards(): Promise<ReadonlyArray<Card>> {
		const cards = await GetAllCardsUseCase.run();
		cardStore.setState({ cards, filteredCards: cards });
		return cards;
	}

	filterByName(name: string): void {
		Filters.create({ byName: name });
		const { cards } = cardStore.getState();
		const filteredCards = FilterCardsByNameUseCase.run(cards, name);
		cardStore.setState({ filteredCards: filteredCards });
	}
}

export const cardBloc = new CardBloc();
