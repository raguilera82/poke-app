import { Cache } from "../../common/decorators/cache";
import type { Card } from "./card.model";
import { cardStore } from "./card.store";
import { FilterCardsByHPUseCase } from "./usecases/filter-cards-by-hp.usecase";
import { FilterCardsByNameUseCase } from "./usecases/filter-cards-by-name.usecase";
import { GetAllCardsUseCase } from "./usecases/get-all-cards.usecase";

class CardBloc {
	@Cache("poke_cards_cache")
	async getAllCards(): Promise<Card[]> {
		const cards = await GetAllCardsUseCase.run();
		cardStore.setState({ cards });
		return cards;
	}

	filterByName(name: string) {
		const { cards } = cardStore.getState();
		const filteredCards = FilterCardsByNameUseCase.run(cards, name);
		cardStore.setState({ cards: filteredCards });
	}

	filterByHP(minHP: number) {
		const { cards } = cardStore.getState();
		const filteredCards = FilterCardsByHPUseCase.run(cards, minHP);
		cardStore.setState({ cards: filteredCards });
	}

	async reset() {
		const cards = await this.getAllCards();
		cardStore.setState({ cards });
		return cards;
	}
}

export const cardBloc = new CardBloc();
