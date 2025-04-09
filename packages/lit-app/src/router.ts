import { Router } from "@vaadin/router";
import "./pages/home.page";

export function createRouter(outlet: Element): Router {
	const baseURL = import.meta.env.BASE_URL || "/";
	const router = new Router(outlet, { baseUrl: baseURL });
	router.setRoutes([
		{
			path: "/",
			component: "home-page",
		},
	]);

	return router;
}


