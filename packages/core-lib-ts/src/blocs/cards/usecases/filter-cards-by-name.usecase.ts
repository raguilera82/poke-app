import type { Card } from "../card.model";

export class FilterCardsByNameUseCase {
	static run(cards: Card[], name: string): Card[] {
		if (!name.trim()) return cards;

		return cards.filter((card) =>
			card.nameCard.toLowerCase().includes(name.toLowerCase()),
		);
	}
}
