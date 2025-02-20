export type CardType = {
	idCard: string;
	nameCard: string;
	supertype: string;
	level: string;
	hp: string;
	imageCard: string;
};

export class Card {
	idCard: string;
	nameCard: string;
	supertype: string;
	level: string;
	hp: string;
	imageCard: string;

	constructor(card: CardType) {
		this.idCard = card.idCard;
		this.nameCard = card.nameCard;
		this.supertype = card.supertype;
		this.level = card.level || "No Level Specified";
		this.hp = card.hp;
		this.imageCard = card.imageCard;
	}
}
