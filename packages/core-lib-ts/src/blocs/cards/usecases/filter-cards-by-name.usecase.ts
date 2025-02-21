import type { Card } from "../card.model";
import { cardStore } from "../card.store";

export class FilterCardsByNameUseCase {
	static run(name: string): Card[] {
		const { cards } = cardStore.getState();
		if (!name.trim()) return cards;

		return cards.filter((card) =>
			card.nameCard.toLowerCase().includes(name.toLowerCase()),
		);
	}
}
