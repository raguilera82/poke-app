import { CardsRepository } from "../cards.repository";

export class GetAllCardsUseCase {
	static async run() {
		const repository = new CardsRepository();
		return repository.getAllCards();
	}
}
