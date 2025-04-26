import { LitElement, css, html } from "lit";

export class NotificationElement extends LitElement {
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
		this.duration = 3000;
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

	updated(changedProps) {
		if (changedProps.has("msg") && this.msg) {
			this._show();
		}
	}

	_show() {
		this.visible = true;
		if (this.duration > 0) {
			setTimeout(() => {
				this._hide();
			}, this.duration);
		}
	}

	_hide() {
		this.visible = false;
	}

	render() {
		const classes = {
			notification: true,
			visible: this.visible,
			[this.type?.toLowerCase()]: true,
		};

		return html`
      <style>
        ${this.constructor.styles.cssText}
      </style>
      <div
        class="${Object.entries(classes)
					.filter(([, value]) => value)
					.map(([key]) => key)
					.join(" ")}"
      >
        ${this.msg}
      </div>
    `;
	}

	createRenderRoot() {
		return this;
	}
}

customElements.define("poke-notification", NotificationElement);
