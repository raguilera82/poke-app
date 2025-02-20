import { Store } from "../store";
import type { NotiType } from "./noti.model";

export type NotiStoreState = {
	noti: NotiType;
};

class NotiStore extends Store<NotiStoreState> {
	constructor() {
		super("poke_noti_state");
	}

	static _getInstance(): NotiStore {
		return new NotiStore();
	}
}

export const notiStore = NotiStore._getInstance();
