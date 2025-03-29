import { produce } from "immer";
import { proxy, snapshot, subscribe } from "valtio/vanilla";

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
		setState: (newState: DeepPartial<T>) => {
			const nextState = produce(snapshot(state), (draft) => {
				for (const key in newState) {
					if (Object.prototype.hasOwnProperty.call(newState, key)) {
						(draft as unknown)[key] = Array.isArray(newState[key])
							? [...newState[key]]
							: typeof newState[key] === "object" && newState[key] !== null
								? { ...newState[key] }
								: newState[key];
					}
				}
			});
			Object.assign(state, nextState);
		},
		getState: () => snapshot(state),
		subscribe: (callback: (state: T) => void) => {
			const unsubscribe = subscribe(state, () => callback(state));
			return unsubscribe;
		},
		reset: () => {
			const resetState = produce({} as T, () => initialState);
			Object.assign(state, resetState);
		},
	};
}

type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};