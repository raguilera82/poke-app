import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	type OnDestroy,
	type OnInit,
} from "@angular/core";
import {
	type NotiStoreState,
	notiStore,
} from "@core/blocs/notifications/noti.store";

@Component({
	selector: "app-noti-view",
	template: `
    <poke-notification
      #notiElement
      [msg]="msg"
      [type]="type"
    ></poke-notification>
  `,
	standalone: true,
	imports: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotiView implements OnInit, OnDestroy {
	private unsubscribenotiStore: () => void;
	msg = "";
	type = "INFO";

	ngOnInit() {
		this.unsubscribenotiStore = notiStore.subscribe((state: NotiStoreState) => {
			if (state.noti) {
				this.msg = state.noti.msg;
				this.type = state.noti.type;
				const notiElement = document.querySelector("poke-notification");
				if (notiElement) {
					(notiElement as HTMLElement & { show: (msg: string) => void }).show(
						this.msg,
					);
				}
			}
		});
	}

	ngOnDestroy() {
		this.unsubscribenotiStore();
	}
}
