import { BaseBloc } from "../base.bloc";
import { Noti } from "./noti.model";

/**
 * @typedef {Object} NotiBlocState
 * @typedef {import("./noti.model").NotiType} noti
 */
/** @type {BaseBloc<NotiBlocState>} */
class NotiBloc extends BaseBloc {
	/**
	 *
	 * @param {string} msg
	 */
	showInfo(msg) {
		const noti = new Noti({ msg, type: "INFO" });
		this.setState({ noti });
	}

	constructor() {
		super("poke_noti_state");
	}

	/**
	 *
	 * @returns {NotiBloc}
	 */
	static _getInstance() {
		return new NotiBloc();
	}
}

export const notiBloc = NotiBloc._getInstance();
