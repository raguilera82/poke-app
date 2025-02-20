import { BaseBloc } from "../base.bloc";

/**
 * @typedef {Object} ConfigBlocState
 * @property {import('./config.model').ConfigType} config
 */
class ConfigBloc extends BaseBloc {
	/**
	 *
	 * @returns {Promise<void>}
	 */
	async loadConfig() {
		try {
			const response = await fetch("/config.json");
			if (!response.ok) {
				throw new Error(`Failed to load config: ${response.statusText}`);
			}
			const config = await response.json();

			this.setState({ config });
		} catch (error) {
			console.error("Error cargando la configuración:", error);
		}
	}

	/**
	 * @returns {import("./config.model").ConfigType}
	 */
	get config() {
		return this.state.config;
	}

	constructor() {
		super("poke_config_state");
	}

	/**
	 * @returns {ConfigBloc}
	 */
	static _getInstance() {
		return new ConfigBloc();
	}
}

export const configBloc = ConfigBloc._getInstance();
