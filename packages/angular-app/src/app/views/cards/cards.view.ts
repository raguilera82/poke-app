import { CommonModule } from "@angular/common";
import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	type OnDestroy,
	type OnInit,
} from "@angular/core";
import { cardBloc } from "@core/blocs/cards/card.bloc";
import type { Card } from "@core/blocs/cards/card.model";
import { cardStore } from "@core/blocs/cards/card.store";
import { notiBloc } from "@core/blocs/notifications/noti.bloc";
import { ValidationError } from "@core/helpers/validation";
import "@ui/components/cards-list.element.js";
import "@ui/components/text-input.element.js";

@Component({
	selector: "cards-view",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./cards.view.html",
	styleUrl: "./cards.view.css",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardsView implements OnInit, OnDestroy {
	cards: ReadonlyArray<Card> = [];
	private unsubscribeCardStore: () => void;

	async ngOnInit() {
		this.cards = await cardBloc.getAllCards();
		notiBloc.showInfo("Cards Loaded");

		this.unsubscribeCardStore = cardStore.subscribe((state) => {
			this.cards = state.filteredCards;
		});
	}

	ngOnDestroy() {
		this.unsubscribeCardStore();
	}

	filterByName(e) {
		const name = e.target.value;
		try {
			cardBloc.filterByName(name);
		} catch (error) {
			if (error instanceof ValidationError) {
				notiBloc.showWarning(error.errors["byName"][0]);
			}
		}
	}
}
