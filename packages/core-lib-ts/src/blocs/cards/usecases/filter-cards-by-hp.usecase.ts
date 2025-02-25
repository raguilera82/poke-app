import type { Card } from "../card.model";

export class FilterCardsByHPUseCase {
	static run(cards: Card[], minHP: number): Card[] {
		if (!minHP || minHP <= 0) return cards;

		return cards.filter((card) => {
			const cardHP = Number.parseInt(card.hp) || 0;
			return cardHP === minHP;
		});
	}
}
