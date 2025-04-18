import { LitElement } from "lit";

export declare class NotificationElement extends LitElement {
	msg: string;
	type: string;
	duration: number;
}

declare global {
	interface HTMLElementTagNameMap {
		"poke-notification": NotificationElement;
	}
}
