import { LitElement, html } from "lit";
import "./app.layout.style.css";

class AppLayout extends LitElement {

	render() {
		return html`
      <div class="layout">
       
        <main class="layout-main">
          <div id="outlet"></div>
        </main>
        <footer class="layout-footer">
          <p>&copy; 2025 Poke App</p>
        </footer>
      </div>
    `;
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define("app-layout", AppLayout);
