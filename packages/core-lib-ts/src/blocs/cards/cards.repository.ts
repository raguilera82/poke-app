import axios from "axios";
import { configBloc } from "../config/config.bloc";
import { CardsPaginateDTO, Daum } from "./card.dto";
import { Card } from "./card.model";

export class CardsRepository {
  async getAllCards(): Promise<Card[]> {
    try {
      const response = await axios.get<CardsPaginateDTO>(
        `${configBloc.config.apiBaseUrl}/v2/cards`
      );

      const cards = response.data.data.map((card: Daum) => {
        return new Card({
          idCard: card.id,
          nameCard: card.name,
          supertype: card.supertype,
          level: card.level,
          hp: card.hp,
          imageCard: card.images.large,
        });
      });

      return cards;
    } catch (error) {
      throw error;
    }
  }
}
