import { Noti } from "./noti.model";
import { notiStore } from "./noti.store";

class NotiBloc {

  showInfo(msg: string) {
    const noti = new Noti({ msg, type: "INFO" });
    notiStore.setState({ noti });
  }

  get noti() {
    return notiStore.getState().noti;
  }

  get store() {
    return notiStore;
  }

  static _getInstance() {
    return new NotiBloc();
  }
}

export const notiBloc = NotiBloc._getInstance();
