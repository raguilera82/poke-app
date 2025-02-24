import { configBloc } from "@core/blocs/config/config.bloc";
import { createRoot } from "react-dom/client";
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
