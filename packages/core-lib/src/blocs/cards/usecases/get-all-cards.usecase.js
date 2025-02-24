import { CardsRepository } from "../cards.repository";

/**
 * @class GetAllCardsUseCase
 * @description Use case for retrieving all cards from the repository
 */
export class GetAllCardsUseCase {
    /**
     * Executes the use case to get all cards
     * @static
     * @async
     * @returns {Promise<Array>} Promise that resolves to an array of cards
     */
    static async run() {
        const repository = new CardsRepository();
        return repository.getAllCards();
    }
}
