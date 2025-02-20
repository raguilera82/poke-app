export class Store<T> {
  subscribers: Array<(state: T) => void>;
  state: T | null;
  persistKey: string;

  constructor(persistKey: string) {
    this.subscribers = [];
    this.state = null;
    this.persistKey = persistKey;

    this.loadPersistedState();

    window.addEventListener("beforeunload", () => {
      this.savePersistedState();
    });
  }

  loadPersistedState(): void {
    const persistedState = sessionStorage.getItem(this.persistKey);
    if (persistedState) {
      this.state = JSON.parse(persistedState);
      sessionStorage.removeItem(this.persistKey);
    }
  }

  savePersistedState(): void {
    sessionStorage.setItem(this.persistKey, JSON.stringify(this.state));
  }

  setState(newState: Partial<T>) {
    if (!newState) {
      return;
    }
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
  }

  getState(): T | null {
    return this.state;
  }

  subscribe(callback: (state: T) => void): void {
    this.subscribers.push(callback);
  }

  unsubscribe(callback: (state: T) => void): void {
    const index = this.subscribers.indexOf(callback);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  notifySubscribers(): void {
    this.subscribers.forEach((callback) => {
      this.notifySubscriber(callback);
    });
  }

  notifySubscriber(callback: (state: T) => void) {
    callback(this.state);
  }
}
