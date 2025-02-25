import { CommonModule } from "@angular/common";
import {
	CUSTOM_ELEMENTS_SCHEMA,
	Component,
	type ElementRef,
	type OnInit,
	ViewChildren,
} from "@angular/core";
import { cardBloc } from "@core/blocs/cards/card.bloc";
import type { Card } from "@core/blocs/cards/card.model";
import { cardStore } from "@core/blocs/cards/card.store";
import { notiBloc } from "@core/blocs/notifications/noti.bloc";
import { notiStore } from "@core/blocs/notifications/noti.store";
import "@ui/components/cards-list.element.js";
import "@ui/components/text-input.element.js";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
	@ViewChildren("pokeInput") pokeInputs!: ElementRef[];
	cards: Card[] = [];

	async ngOnInit() {
		this.cards = await cardBloc.getAllCards();

		notiStore.subscribe((state) => {
			console.log(JSON.stringify(state));
		});

		notiBloc.showInfo("Se mostrará?");

		cardStore.subscribe((state) => {
			this.cards = state.cards;
		});
	}

	async resetFilters() {
		await cardBloc.reset();
		this.clearInputs();
	}

	private clearInputs() {
		for (const inputRef of this.pokeInputs) {
			const input = inputRef.nativeElement;
			if (input.shadowRoot) {
				const inputElement = input.shadowRoot.querySelector("input");
				if (inputElement) {
					inputElement.value = "";
				}
			}
		}
	}

	filterByName(e) {
		const name = e.target.value;
		cardBloc.filterByName(name);
	}

	filterByHP(e) {
		const hp = Number(e.target.value);
		cardBloc.filterByHP(hp);
	}
}
