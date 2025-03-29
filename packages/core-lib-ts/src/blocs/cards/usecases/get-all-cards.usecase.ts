import type { Card } from "../card.model";
import { CardsRepository } from "../cards.repository";

export class GetAllCardsUseCase {
	static async run(): Promise<ReadonlyArray<Card>> {
		const repository = new CardsRepository();
		return repository.getAllCards();
	}
}
