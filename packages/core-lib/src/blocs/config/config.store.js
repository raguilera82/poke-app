import { createValtioStore } from "../store";

/**
 * @typedef {Object} ConfigBlocState
 * @property {import('./config.model').Config} config
 */

/**
 * @type {import('../store').ValtioStore<CardBlocState>}
 */
export const configStore = createValtioStore(
  { config: {} },
  "poke_config_state"
);
