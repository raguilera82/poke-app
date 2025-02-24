import { configStore } from "../config/config.store";
import { Noti } from "./noti.model";
import { notiStore } from "./noti.store";

/**
 * @typedef {Object} NotiBlocState
 * @typedef {import("./noti.model").NotiType} noti
 */
class NotiBloc {
	/**
	 *
	 * @param {string} msg
	 */
	showInfo(msg) {
		const noti = new Noti({ msg, type: "INFO" });
		notiStore.setState({ noti });
	}

	get store() {
			return configStore;
		}
}

export const notiBloc = new NotiBloc();
