import { Cache } from "../../common/decorators/cache";
import { Card } from "./card.model";
import { cardStore } from "./card.store";
import { CardsRepository } from "./cards.repository";

class CardBloc {
  @Cache("poke_cards_cache")
  async getAllCards(): Promise<Card[]> {
    const cardsRepository = new CardsRepository();
    const cards = await cardsRepository.getAllCards();
    console.log("cards", cards);
    cardStore.setState({ cards });
    return cards;
  }

  static _getInstance(): CardBloc {
    return new CardBloc();
  }
}

export const cardBloc = CardBloc._getInstance();
