import { createValtioStore } from "../store";
import type { Noti } from "./noti.model";

export type NotiStoreState = {
	noti: Noti | null;
};

const noti: Noti = null;

const initialState: NotiStoreState = {
	noti,
};

export const notiStore = createValtioStore<NotiStoreState>(
	initialState,
	"poke_noti_state",
);
