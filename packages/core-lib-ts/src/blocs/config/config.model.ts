type ConfigType = {
	apiBaseUrl: string;
	apiKey: string;
};

export class Config {
	readonly apiBaseUrl: string;
	readonly apiKey: string;

	constructor(config: ConfigType) {
		this.apiBaseUrl = config.apiBaseUrl;
		this.apiKey = config.apiKey;
	}
}
