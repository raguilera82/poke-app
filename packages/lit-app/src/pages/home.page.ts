import { LitElement, html } from "lit";
import "../views/cards.view";

export class HomePage extends LitElement {
	render() {
		return html`
            <cards-view></cards-view>
        `;
	}
}

customElements.define("home-page", HomePage);
