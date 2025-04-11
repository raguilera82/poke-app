import cards200 from "../../../fixtures/cards-200.json";
import type { Daum } from "./card.dto";
import { Card } from "./card.model";

export class CardsRepository {
	async getAllCards(): Promise<ReadonlyArray<Card>> {
		/* const response = await axios.get<CardsPaginateDTO>(
			`${configBloc.config.apiBaseUrl}/v2/cards`,
		); 
		const data = response.data.data;
		*/

		const data = cards200.data.data;

		const cards = data.map((card: Daum) => {
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
	}
}
