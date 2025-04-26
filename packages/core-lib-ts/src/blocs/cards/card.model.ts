import { z } from "zod";
import { validate } from "../../helpers/validation";

const CardSchema = z.object({
	idCard: z.string().nullable(),
	nameCard: z.string().max(50, {
		message: "Card name cannot exceed 50 characters",
	}),
	supertype: z.string(),
	level: z.string().default("No Level Specified"),
	hp: z.string(),
	imageCard: z.string(),
});

type CardType = z.infer<typeof CardSchema>;

export class Card {
	readonly idCard: string;
	readonly nameCard: string;
	readonly supertype: string;
	readonly level: string;
	readonly hp: string;
	readonly imageCard: string;

	private constructor(card: CardType) {
		this.idCard = card.idCard;
		this.nameCard = card.nameCard;
		this.supertype = card.supertype;
		this.level = card.level;
		this.hp = card.hp;
		this.imageCard = card.imageCard;
	}

	static create(card: CardType): Card {
		const parsedCard = validate(CardSchema, card);
		return new Card(parsedCard);
	}
}
