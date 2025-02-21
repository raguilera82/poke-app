import { Cache } from "../../common/decorators/cache";
import type { Card } from "./card.model";
import { cardStore } from "./card.store";
import { FilterCardsByNameUseCase } from "./usecases/filter-cards-by-name.usecase";
import { GetAllCardsUseCase } from "./usecases/get-all-cards.usecase";

class CardBloc {
	@Cache("poke_cards_cache")
	async getAllCards(): Promise<Card[]> {
		const cards = await GetAllCardsUseCase.run();
		cardStore.setState({ cards });
		return cards;
	}

	filterByName(name: string): Card[] {
		return FilterCardsByNameUseCase.run(name);
	}
}

export const cardBloc = new CardBloc();
