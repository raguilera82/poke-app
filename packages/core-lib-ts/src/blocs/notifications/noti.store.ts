import { createValtioStore } from "../store";
import type { NotiType } from "./noti.model";

export type NotiStoreState = {
	noti: NotiType;
};

export const notiStore = createValtioStore<NotiStoreState>(
	{ noti: null },
	"poke_noti_state",
);
