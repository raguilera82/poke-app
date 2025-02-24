import { createValtioStore } from "../store";
import type { ConfigType } from "./config.model";

export type ConfigBlocState = {
	config: ConfigType;
};

export const configStore = createValtioStore<ConfigBlocState>(
	{ config: null },
	"poke_config_state",
);
