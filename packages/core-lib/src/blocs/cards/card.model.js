/**
 * @typedef {Object} CardType
 * @property {string} idCard
 * @property {string} nameCard
 * @property {string} supertype
 * @property {string} level
 * @property {string} hp
 */
export class Card {
	/**
	 *
	 * @param {CardType} card
	 */
	constructor({ idCard, nameCard, supertype, level, hp }) {
		this.idCard = idCard;
		this.nameCard = nameCard;
		this.supertype = supertype;
		this.level = level;
		this.hp = hp;
	}
}
