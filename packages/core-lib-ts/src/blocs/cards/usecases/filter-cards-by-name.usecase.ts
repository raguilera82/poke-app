import type { Card } from "../card.model";

export class FilterCardsByNameUseCase {
	static run(cards: ReadonlyArray<Card>, name: string): ReadonlyArray<Card> {
		if (!name.trim()) return cards;

		return [...cards].filter((card) =>
			card.nameCard.toLowerCase().includes(name.toLowerCase()),
		);
	}
}
