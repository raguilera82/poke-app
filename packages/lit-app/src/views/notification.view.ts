import type { Noti } from "@core/blocs/notifications/noti.model";
import {
	type NotiStoreState,
	notiStore,
} from "@core/blocs/notifications/noti.store";
import "@ui/components/noti.element";
import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";

export class NotificationView extends LitElement {
	@state()
	private noti: Noti | null = null;

	unsubscribe!: () => void;

	connectedCallback(): void {
		super.connectedCallback();
		this.unsubscribe = notiStore.subscribe((state: NotiStoreState) => {
			if (state.noti) {
				this.noti = null;
				setTimeout(() => {
					this.noti = { ...state.noti };
				}, 10);
			}
		});
	}

	disconnectedCallback(): void {
		this.unsubscribe();
		super.disconnectedCallback();
	}

	render() {
		return html`${
			this.noti &&
			html`<poke-notification msg="${this.noti.msg}" 
		                     type="${this.noti.type}" 
							 duration="${this.noti.duration}"></poke-notification>`
		}
          `;
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define("notification-view", NotificationView);
