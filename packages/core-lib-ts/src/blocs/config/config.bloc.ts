import axios from "axios";
import { Config, ConfigType } from "./config.model";
import { configStore } from "./config.store";

class ConfigBloc {
  async loadConfig(): Promise<void> {
    try {
      const response = await axios.get("/config.json");
      if (!response.data) {
        throw new Error(`Failed to load config: ${response.statusText}`);
      }
      const data = await response.data;

      const config = new Config({
        apiBaseUrl: data.apiBaseUrl,
        apiKey: data.apiKey,
      });

      configStore.setState({ config });
    } catch (error) {
      console.error("Error cargando la configuración:", error);
    }
  }

  get config(): ConfigType {
    return configStore.getState().config;
  }

  static _getInstance(): ConfigBloc {
    return new ConfigBloc();
  }
}

export const configBloc = ConfigBloc._getInstance();
