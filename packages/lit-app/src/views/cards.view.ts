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
			console.log(state.filteredCards, "state");
			this.cards = state.filteredCards;
		});
		await cardBloc.getAllCards();
	}

	handleFilter = async (event: CustomEvent<string>) => {
		const query = event.detail;
		console.log(query, "query");
		try {
			cardBloc.filterByName(query);
		} catch (error) {
			console.error("Error filtering cards:", error);
		}
	};

	disconnectedCallback(): void {
		this.unsubscribe();
		super.disconnectedCallback();
	}

	render() {
		return html`
            <h1>Lit Pokemóns</h1>
			<poke-text-input @on-submit="${this.handleFilter}" buttonText="Filter"></poke-text-input>
            <poke-cards-list .cards="${this.cards}"></poke-cards-list>
        `;
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define("cards-view", CardsView);
