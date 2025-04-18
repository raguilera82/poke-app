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
	  [duration]="duration"
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
	duration = 3000;

	ngOnInit() {
		this.unsubscribenotiStore = notiStore.subscribe((state: NotiStoreState) => {
			if (state.noti) {
				this.msg = state.noti.msg;
				this.type = state.noti.type;
				this.duration = state.noti.duration;
			}
		});
	}

	ngOnDestroy() {
		this.unsubscribenotiStore();
	}
}
