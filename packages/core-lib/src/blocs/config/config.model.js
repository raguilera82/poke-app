/**
 * @typedef {Object} ConfigType
 * @property {string} apiBaseUrl
 * @property {string} apiKey
 */
export class Config {
	/**
	 *
	 * @param {ConfigType} config
	 */
	constructor({ apiBaseUrl, apiKey }) {
		this.apiBaseUrl = apiBaseUrl;
		this.apiKey = apiKey;
	}
}
