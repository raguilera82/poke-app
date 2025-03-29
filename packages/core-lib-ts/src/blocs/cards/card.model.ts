import { CardNameTooLongError } from "../../errors/card-name-too-long.error";

type CardType = Readonly<{
	idCard: string;
	nameCard: string;
	supertype: string;
	level: string;
	hp: string;
	imageCard: string;
}>;

export class Card {
	readonly idCard: string;
	readonly nameCard: string;
	readonly supertype: string;
	readonly level: string;
	readonly hp: string;
	readonly imageCard: string;

	constructor(card: CardType) {
		this.idCard = card.idCard;
		this.nameCard = createValidatedCardName(card.nameCard);
		this.supertype = card.supertype;
		this.level = card.level || "No Level Specified";
		this.hp = card.hp;
		this.imageCard = card.imageCard;
	}
}

const createValidatedCardName = (name: string): string => {
	if (name.length > 50) {
		throw new CardNameTooLongError(name);
	}
	return name;
};
