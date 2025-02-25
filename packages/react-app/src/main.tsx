import { configBloc } from "@core/blocs/config/config.bloc";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import "./index.css";

async function loadConfigAndRenderApp() {
	try {
		await configBloc.loadConfig();
		const rootElement = document.getElementById("root");
		if (rootElement) {
			createRoot(rootElement).render(<App />);
		} else {
			console.error("Root element not found");
		}
	} catch (error) {
		console.error("Error loading configuration:", error);
	}
}

loadConfigAndRenderApp();
