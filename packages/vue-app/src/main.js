import { createApp } from "vue";
import { configBloc } from "../../core-lib-ts/src/blocs/config/config.bloc";
import App from "./App.vue";
import router from './router';
import "./style.css";

async function loadConfigAndRenderApp() {
  try {
    await configBloc.loadConfig();
    const app = createApp(App)
    app.use(router)
    app.mount("#app");
  } catch (error) {
    console.error("Error loading configuration:", error);
  }
}

loadConfigAndRenderApp();
