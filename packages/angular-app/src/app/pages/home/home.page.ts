import { Component } from "@angular/core";
import "@ui/components/cards-list.element.js";
import "@ui/components/text-input.element.js";
import { CardsView } from "../../views/cards/cards.view";

@Component({
	selector: "home-page",
	standalone: true,
	imports: [CardsView],
	templateUrl: "./home.page.html",
	styleUrl: "./home.page.css",
})
export class HomePage {}
