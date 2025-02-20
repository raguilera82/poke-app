import { createApp } from "vue";
import { configBloc } from "../../core-lib-ts/src/blocs/config/config.bloc";
import App from "./App.vue";
import "./style.css";

async function loadConfigAndRenderApp() {
	try {
		await configBloc.loadConfig();
		createApp(App).mount("#app");
	} catch (error) {
		console.error("Error loading configuration:", error);
	}
}

loadConfigAndRenderApp();
