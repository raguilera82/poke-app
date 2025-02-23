import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, Component, type OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { cardBloc } from "../../../core-lib-ts/src/blocs/cards/card.bloc";
import type { Card } from "../../../core-lib-ts/src/blocs/cards/card.model";
import { notiBloc } from "../../../core-lib-ts/src/blocs/notifications/noti.bloc";
import "../../../core-ui/src/components/cards-list.element.js";
import "../../../core-ui/src/components/text-input.element.js";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, CommonModule],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
	title = "angular-app";
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
