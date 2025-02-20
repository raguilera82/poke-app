import { LitElement, css, html } from "lit";

export class CardList extends LitElement {
	static get properties() {
		return {
			cards: { type: Array },
		};
	}

	constructor() {
		super();
		this.cards = [];
	}

	static get styles() {
		return css`
      .cards-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        padding: 16px;
      }

      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        overflow: hidden;
        background-color: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }

      .card img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
      }

      .card:hover {
        transform: translateY(-5px);
      }

      @media (max-width: 600px) {
        .cards-container {
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        }

        .card {
          padding: 0;
        }
      }
    `;
	}

	render() {
		return html`
      <style>
        ${this.constructor.styles.cssText}
      </style>
      <div class="cards-container">
        ${this.cards?.map(
					(card) => html`
            <div class="card">
              <img src="${card.imageCard}" alt="${card.nameCard}" />
              <p>${card.level}</p>
            </div>
          `,
				)}
      </div>
    `;
	}

	createRenderRoot() {
		return this; // Evita el uso del Shadow DOM
	}
}

customElements.define("poke-cards-list", CardList);
