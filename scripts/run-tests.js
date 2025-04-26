import { spawn } from "node:child_process";
import waitOn from "wait-on";

console.log("Iniciando servidores... 🚀");
const servers = spawn("npm", ["run", "up"], {
	stdio: "inherit",
	shell: true,
	detached: true,
});

const urls = [
	"http://localhost:9103",
	"http://localhost:9101",
	"http://localhost:9102",
	"http://localhost:9100",
];

console.log("Esperando a que los servidores estén disponibles... ⌛");

waitOn({
	resources: urls,
	timeout: 120000,
	interval: 1000,
})
	.then(() => {
		console.log(
			"Todos los servidores están disponibles ✅. Ejecutando tests e2e... 🏃",
		);

		const tests = spawn("npm", ["run", "e2e"], {
			stdio: "inherit",
			shell: true,
		});

		tests.on("close", (code) => {
			console.log(`Tests e2e finalizados con código: ${code} ✅`);

			// Matar el proceso de los servidores
			if (process.platform === "win32") {
				spawn("taskkill", ["/pid", servers.pid, "/f", "/t"], {
					stdio: "inherit",
				});
			} else {
				process.kill(-servers.pid); // El signo menos es importante para matar el grupo de procesos
			}

			process.exit(code);
		});
	})
	.catch((err) => {
		console.error("Error al esperar los servidores:", err);

		// Matar los servidores también en caso de error
		if (process.platform === "win32") {
			spawn("taskkill", ["/pid", servers.pid, "/f", "/t"], {
				stdio: "inherit",
			});
		} else {
			process.kill(-servers.pid);
		}

		process.exit(1);
	});

// Capturar señales para limpieza
process.on("SIGINT", () => {
	console.log("Recibida señal de interrupción. Limpiando... 🧹");
	if (process.platform === "win32") {
		spawn("taskkill", ["/pid", servers.pid, "/f", "/t"], { stdio: "inherit" });
	} else {
		process.kill(-servers.pid);
	}
	process.exit(0);
});
