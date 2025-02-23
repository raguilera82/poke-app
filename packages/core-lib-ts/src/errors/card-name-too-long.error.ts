export class CardNameTooLongError extends Error {
	constructor(name: string) {
		super(`Card name "${name}" exceeds maximum length of 50 characters`);
		this.name = "CardNameTooLongError";
	}
}
