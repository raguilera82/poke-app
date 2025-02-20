// @ts-check

/**
 * @template T
 */
export class BaseBloc {
	/** @type {Array<(state: T) => void>} */
	subscribers;

	/** @type {T | null} */
	state;

	/** @type {string} */
	persistKey;

	/**
	 * @param {string} persistKey
	 */
	constructor(persistKey) {
		/** @type {Array<(state: T) => void>} */
		this.subscribers = [];
		/** @type {T | null} */
		this.state = null;
		/** @type {string} */
		this.persistKey = persistKey;

		this.loadPersistedState();

		window.addEventListener("beforeunload", () => {
			this.savePersistedState();
		});
	}

	/**
	 * Carga el estado persistido desde sessionStorage.
	 * @returns {void}
	 */
	loadPersistedState() {
		const persistedState = sessionStorage.getItem(this.persistKey);
		if (persistedState) {
			this.state = /** @type {T} */ (JSON.parse(persistedState));
			sessionStorage.removeItem(this.persistKey);
		}
	}

	/**
	 * Guarda el estado actual en sessionStorage.
	 * @returns {void}
	 */
	savePersistedState() {
		if (this.state !== null) {
			sessionStorage.setItem(this.persistKey, JSON.stringify(this.state));
		}
	}

	/**
	 * Actualiza el estado con los nuevos valores proporcionados.
	 * @param {Partial<T>} newState
	 * @returns {void}
	 */
	setState(newState) {
		if (!newState) {
			return;
		}
		this.state = /** @type {T} */ ({ ...this.state, ...newState });
		this.notifySubscribers();
	}

	/**
	 * Obtiene el estado actual.
	 * @returns {T | null}
	 */
	getState() {
		return this.state;
	}

	/**
	 * Suscribe una función para recibir actualizaciones de estado.
	 * @param {(state: T) => void} callback
	 * @returns {void}
	 */
	subscribe(callback) {
		this.subscribers.push(callback);
	}

	/**
	 * Desuscribe una función previamente suscrita.
	 * @param {(state: T) => void} callback
	 * @returns {void}
	 */
	unsubscribe(callback) {
		const index = this.subscribers.indexOf(callback);
		if (index !== -1) {
			this.subscribers.splice(index, 1);
		}
	}

	/**
	 * Notifica a todos los suscriptores sobre el cambio de estado.
	 * @returns {void}
	 */
	notifySubscribers() {
		if (this.state !== null) {
			this.subscribers.forEach((callback) => {
				this.notifySubscriber(callback);
			});
		}
	}

	/**
	 * Notifica a un suscriptor específico sobre el cambio de estado.
	 * @param {(state: T) => void} callback
	 * @returns {void}
	 */
	notifySubscriber(callback) {
		if (this.state !== null) {
			callback(this.state);
		}
	}
}
