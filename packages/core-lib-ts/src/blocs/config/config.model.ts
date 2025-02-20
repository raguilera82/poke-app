export type ConfigType = {
	apiBaseUrl: string;
	apiKey: string;
};

export class Config {
	apiBaseUrl: string;
	apiKey: string;

	constructor(config: ConfigType) {
		this.apiBaseUrl = config.apiBaseUrl;
		this.apiKey = config.apiKey;
	}
}
