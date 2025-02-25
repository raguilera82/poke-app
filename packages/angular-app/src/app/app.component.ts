import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import "@ui/components/noti.element";
import { NotiView } from "./views/noti/noti.view";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, NotiView],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
	title = "angular-app";
}
