import { proxy, subscribe } from "valtio";

export function createValtioStore<T extends object>(
	initialState: T,
	storageKey: string,
) {
	const persistedState = sessionStorage.getItem(storageKey);
	const state = proxy<T>(
		persistedState ? JSON.parse(persistedState) : initialState,
	);

	subscribe(state, () => {
		sessionStorage.setItem(storageKey, JSON.stringify(state));
	});

	return {
		setState: (newState: Partial<T>) => {
			Object.assign(state, newState);
		},
		getState: () => state,
		subscribe: (callback: (state: T) => void) => {
			const unsubscribe = subscribe(state, () => callback(state));
			return unsubscribe;
		},
	};
}
