import { LitElement, css, html } from "lit";

export class TextInput extends LitElement {
	static get properties() {
		return {
			value: { type: String },
			placeholder: { type: String },
			buttonText: { type: String },
			resetText: { type: String },
		};
	}

	constructor() {
		super();
		this.value = "";
		this.placeholder = "Type here...";
		this.buttonText = "Submit";
		this.resetText = "Reset";
	}

	static get styles() {
		return css`
      .input-container {
        display: flex;
        gap: 8px;
        max-width: 400px;
        margin: 16px;
      }

      input {
        flex: 1;
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
      }

      button {
        padding: 8px 16px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }

      .reset {
        background-color: #f44336;
      }

      @media (max-width: 600px) {
        .input-container {
          margin: 8px;
        }
      }
    `;
	}

	handleInput(e) {
		this.value = e.target.value;
	}

	handleSubmit() {
		const event = new CustomEvent("on-submit", {
			detail: this.value,
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(event);
	}

	handleReset() {
		this.value = "";
		const event = new CustomEvent("on-reset", {
			detail: this.value,
			bubbles: true,
			composed: true,
		});
		this.dispatchEvent(event);
	}

	render() {
		return html`
      <style>
        ${this.constructor.styles.cssText}
      </style>
      <div class="input-container">
        <input
          type="text"
          .value=${this.value}
          @input=${this.handleInput}
          placeholder=${this.placeholder}
          @keyup=${(e) => e.key === "Enter" && this.handleSubmit()}
        />
        <button @click=${this.handleSubmit}>${this.buttonText}</button>
        <button class="reset" @click=${this.handleReset}>
          ${this.resetText}
        </button>
      </div>
    `;
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define("poke-text-input", TextInput);
