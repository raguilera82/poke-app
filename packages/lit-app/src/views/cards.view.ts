import { cardBloc } from "@core/blocs/cards/card.bloc";
import type { Card } from "@core/blocs/cards/card.model";
import { cardStore } from "@core/blocs/cards/card.store";
import "@ui/components/cards-list.element.js";
import "@ui/components/text-input.element.js";
import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";

export class CardsView extends LitElement {
	@state()
	private cards: readonly Card[] = [];

	unsubscribe!: () => void;

	async connectedCallback() {
		super.connectedCallback();

		this.unsubscribe = cardStore.subscribe((state) => {
			this.cards = state.filteredCards;
		});
		await cardBloc.getAllCards();
	}

	handleFilter = async (event: CustomEvent<string>) => {
		const query = event.detail;
		cardBloc.filterByName(query);
	};

	handleReset = async () => {
		await cardBloc.getAllCards();
	};

	disconnectedCallback(): void {
		this.unsubscribe();
		super.disconnectedCallback();
	}

	render() {
		return html`
            <h1>Lit Pokemóns</h1>
			<poke-text-input @on-reset="${this.handleReset}" @on-submit="${this.handleFilter}" buttonText="Filter"></poke-text-input>
            <poke-cards-list .cards="${this.cards}"></poke-cards-list>
        `;
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define("cards-view", CardsView);
