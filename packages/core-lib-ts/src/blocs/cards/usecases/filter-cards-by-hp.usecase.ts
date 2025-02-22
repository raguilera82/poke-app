import type { Card } from "../card.model";

export class FilterCardsByHpUseCase {
	static run(cards: Card[], hp: string): Card[] {
		if (!hp) return cards;
		return cards.filter((card) => card.hp === hp);
	}
}
