import axios from "axios";
import { configBloc } from "../config/config.bloc";
import { Card } from "./card.model";

export class CardsRepository {
	/**
	 * @returns {Promise<import("./card.model").CardType>}
	 */
	async getAllCards() {
		try {
			const response = await axios.get(
				`${configBloc.config.apiBaseUrl}/v2/cards`,
			);

			const cards = response.data.data.map((card) => {
				return new Card({
					idCard: card.id,
					nameCard: card.name,
					supertype: card.supertype,
					level: card.level,
					hp: card.hp,
				});
			});

			return cards;
		} catch (error) {
			throw error;
		}
	}
}
