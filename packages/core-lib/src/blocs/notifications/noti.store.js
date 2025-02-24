import { createValtioStore } from "../store";

/**
 * @typedef {Object} NotiBlocState
 * @typedef {import("./noti.model").Noti} noti
 */

/**
 * @type {import('../store').ValtioStore<NotiBlocState>}
 */
export const notiStore = createValtioStore(
  { noti: null },
  "poke_noti_state"
);
