import { createValtioStore } from "../store";

/**
 * @typedef {Object} CardBlocState
 * @property {import('./card.model').Card[]} cards - Array of cards
 */

/**
 * @type {import('../store').ValtioStore<CardBlocState>}
 */
export const cardStore = createValtioStore(
  { cards: [] },
  "poke_cards_state"
);
