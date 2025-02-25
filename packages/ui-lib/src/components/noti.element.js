import { LitElement, css, html } from "lit";

export class Notification extends LitElement {
	static get properties() {
		return {
			msg: { type: String },
			type: { type: String },
			visible: { type: Boolean },
			duration: { type: Number },
		};
	}

	constructor() {
		super();
		this.msg = "";
		this.type = "INFO";
		this.visible = false;
		this.duration = 3000; // 3 segundos por defecto
	}

	static get styles() {
		return css`
      :host {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
      }

      .notification {
        padding: 16px 24px;
        border-radius: 4px;
        color: white;
        font-size: 16px;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
      }

      .notification.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .notification.info {
        background-color: #2196f3;
      }

      .notification.success {
        background-color: #4caf50;
      }

      .notification.error {
        background-color: #f44336;
      }

      .notification.warning {
        background-color: #ff9800;
      }
    `;
	}

	show(message, duration) {
		this.msg = message;
		if (duration) this.duration = duration;
		this.visible = true;

		// Auto-ocultar después del tiempo especificado
		setTimeout(() => {
			this.hide();
		}, this.duration);
	}

	hide() {
		this.visible = false;
	}

	render() {
		const classes = {
			notification: true,
			visible: this.visible,
			[this.type.toLowerCase()]: true,
		};

		return html`
      <div class="${Object.entries(classes)
				.filter(([, value]) => value)
				.map(([key]) => key)
				.join(" ")}">
        ${this.msg}
      </div>
    `;
	}
}

customElements.define("poke-notification", Notification);
