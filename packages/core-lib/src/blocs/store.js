import { proxy, subscribe } from "valtio";

/**
 * Creates a Valtio store with persistence
 * @template {object} T
 * @param {T} initialState - The initial state of the store
 * @param {string} storageKey - The key used for storage
 * @returns {{
 *   setState: (newState: Partial<T>) => void,
 *   getState: () => T,
 *   subscribe: (callback: (state: T) => void) => () => void
 * }}
 */
export function createValtioStore(initialState, storageKey) {
  const persistedState = sessionStorage.getItem(storageKey);
  const state = proxy(
    persistedState ? JSON.parse(persistedState) : initialState
  );

  subscribe(state, () => {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  });

  return {
    setState: (newState) => {
      Object.assign(state, newState);
    },
    getState: () => state,
    subscribe: (callback) =>
      subscribe(state, () => callback(state)),
  };
}
