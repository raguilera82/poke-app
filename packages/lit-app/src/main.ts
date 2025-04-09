import { configBloc } from "@core/blocs/config/config.bloc";
import { LitElement, html } from "lit";
import "./layouts/app.layout";
import { createRouter } from "./router";
//import "./style.css";

class App extends LitElement {

	async connectedCallback() {
    
		await configBloc.loadConfig();
		super.connectedCallback();
	  }

	async firstUpdated() {
		await this.updateComplete;
		const appLayout = this.querySelector("app-layout") as LitElement;
		await appLayout?.updateComplete;
		const outlet = appLayout.querySelector("#outlet") as Element;
		console.log(outlet, "outlet");
		const router = createRouter(outlet);
		router.setOutlet(outlet);
	}

	render() {
		return html`<app-layout>
		</app-layout>`;
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define("lit-app", App);
