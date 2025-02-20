/**
 * @typedef {Object} NotiType
 * @property {string} msg
 * @property {string} type
 */
export class Noti {
	/**
	 *
	 * @param {NotiType} noti
	 */
	constructor({ msg, type }) {
		this.msg = msg;
		this.type = type;
	}
}
