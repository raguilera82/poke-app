import { Noti } from "./noti.model";
import { notiStore } from "./noti.store";

class NotiBloc {
	showInfo(msg: string) {
		const noti = new Noti({ msg, type: "INFO" });
		notiStore.setState({ noti });
	}

	get noti(): Noti | null {
		return notiStore.getState().noti;
	}
}

export const notiBloc = new NotiBloc();
