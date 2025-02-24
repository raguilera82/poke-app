import { configStore } from "./config.store";

class ConfigBloc {
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

			configStore.setState({ config });
		} catch (error) {
			console.error("Error cargando la configuración:", error);
		}
	}

	/**
	 * @returns {import("./config.model").ConfigType}
	 */
	get config() {
		return configStore.getState()?.config;
	}
}

export const configBloc = new ConfigBloc();
