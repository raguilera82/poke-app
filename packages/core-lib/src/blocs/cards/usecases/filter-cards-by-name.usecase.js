/**
 * @typedef {import("../card.model").Card} Card
 */

export class FilterCardsByNameUseCase {
	/**
	 * Filters cards by name
	 * @param {Card[]} cards - Array of cards to filter
	 * @param {string} name - Name to filter by
	 * @returns {Card[]} Filtered array of cards
	 */
	static run(cards, name) {
	  if (!name.trim()) return cards;
  
	  return cards.filter((card) =>
		card.nameCard.toLowerCase().includes(name.toLowerCase())
	  );
	}
  }