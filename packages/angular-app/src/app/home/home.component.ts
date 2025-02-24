import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, type OnInit } from "@angular/core";
import "@core-ui/components/cards-list.element.js";
import "@core-ui/components/text-input.element.js";
import { cardBloc } from "@core/blocs/cards/card.bloc";
import type { Card } from "@core/blocs/cards/card.model";
import { notiBloc } from "@core/blocs/notifications/noti.bloc";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
	cards: Card[] = [];

	async ngOnInit() {
		this.cards = await cardBloc.getAllCards();

		notiBloc.store.subscribe((state) => {
			console.log(JSON.stringify(state));
		});

		notiBloc.showInfo("Se mostrará?");
	}

	filterByName(e) {
		const name = e.target.value;
		this.cards = cardBloc.filterByName(name);
	}
}
