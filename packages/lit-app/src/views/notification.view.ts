import { notiStore } from "@core/blocs/notifications/noti.store";
import { LitElement, html } from "lit";
export class NotificationView extends LitElement {
	unsubscribe!: () => void;

	connectedCallback(): void {
		super.connectedCallback();
		this.unsubscribe = notiStore.subscribe((state) => {});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.unsubscribe();
	}

	render() {
		return html`
          <poke-notification></poke-notification>
        `;
	}
}

customElements.define("notification-view", NotificationView);
