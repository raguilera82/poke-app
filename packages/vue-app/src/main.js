import { configBloc } from "@core/blocs/config/config.bloc";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

async function loadConfigAndRenderApp() {
	try {
		await configBloc.loadConfig();
		const app = createApp(App);
		app.use(router);
		app.mount("#app");
	} catch (error) {
		console.error("Error loading configuration:", error);
	}
}

loadConfigAndRenderApp();
