import { createValtioStore } from "../store";
import type { Noti } from "./noti.model";

export type NotiStoreState = {
	noti: Noti;
};

const initialState: NotiStoreState = {
	noti: {
		msg: "",
		type: "",
		duration: 0,
	},
};

export const notiStore = createValtioStore<NotiStoreState>(
	initialState,
	"poke_noti_state",
);
