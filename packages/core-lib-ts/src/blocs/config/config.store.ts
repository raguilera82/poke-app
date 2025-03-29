import { createValtioStore } from "../store";
import type { Config } from "./config.model";

export type ConfigBlocState = {
	config: Config | null;
};

export const configStore = createValtioStore<ConfigBlocState>(
	{ config: null },
	"poke_config_state",
);
