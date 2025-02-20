import { createRoot } from "react-dom/client";
import { configBloc } from "../../core-lib-ts/src/blocs/config/config.bloc";
import App from "./App.jsx";
import "./index.css";

async function loadConfigAndRenderApp() {
	try {
		await configBloc.loadConfig();
		createRoot(document.getElementById("root")).render(<App />);
	} catch (error) {
		console.error("Error loading configuration:", error);
	}
}

loadConfigAndRenderApp();
