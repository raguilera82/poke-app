import { Noti } from "./noti.model";
import { notiStore } from "./noti.store";

class NotiBloc {
	showInfo(msg: string, duration = 3000): void {
		const noti = new Noti({
			msg,
			type: "INFO",
			duration,
		});
		notiStore.setState({ noti });
	}

	showWarning(msg: string, duration = 3000): void {
		const noti = new Noti({
			msg,
			type: "WARNING",
			duration,
		});
		notiStore.setState({ noti });
	}

	get noti(): Noti | null {
		return notiStore.getState().noti;
	}
}

export const notiBloc = new NotiBloc();
