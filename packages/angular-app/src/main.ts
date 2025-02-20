import { bootstrapApplication } from "@angular/platform-browser";
import { configBloc } from "../../core-lib-ts/src/blocs/config/config.bloc";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

async function loadConfigAndRenderApp() {
	try {
		await configBloc.loadConfig();
		bootstrapApplication(AppComponent, appConfig).catch((err) =>
			console.error(err),
		);
	} catch (error) {
		console.error("Error loading configuration:", error);
	}
}

loadConfigAndRenderApp();
