import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	type OnDestroy,
	type OnInit,
} from "@angular/core";
import type { Noti } from "@core/blocs/notifications/noti.model";
import {
	type NotiStoreState,
	notiStore,
} from "@core/blocs/notifications/noti.store";

@Component({
	selector: "app-noti-view",
	template: `
    <poke-notification
      #notiElement
      [msg]="noti?.msg"
      [type]="noti?.type"
	  [duration]="noti?.duration"
	  ></poke-notification>	
  `,
	standalone: true,
	imports: [],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NotiView implements OnInit, OnDestroy {
	private unsubscribenotiStore: () => void;
	noti: Noti | null = null;

	ngOnInit() {
		this.unsubscribenotiStore = notiStore.subscribe((state: NotiStoreState) => {
			if (state.noti) {
				this.noti = null;
				setTimeout(() => {
					this.noti = { ...state.noti };
				}, 10);
			}
		});
	}

	ngOnDestroy() {
		this.unsubscribenotiStore();
	}
}
