import { expect, test } from "@playwright/test";

test.describe("Pokemon tests", () => {
	// Increase timeout for all tests in this suite
	test.setTimeout(30000);

	test("shows pokemons heading", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByText("Pokemóns")).toBeVisible();
	});

	test('filters pokemon cards by name "cater"', async ({ page }) => {
		await page.goto("/");

		// Wait for at least one card to be visible before continuing
		await page.locator(".card").first().waitFor();

		await page.getByPlaceholder("Type here...").fill("cater");
		await page.getByRole("button", { name: "Filter" }).click();

		// Wait for loading state to disappear if it exists
		await page.waitForSelector(".loading", { state: "detached" });

		// Wait for the list to update and stabilize
		const cards = page.locator(".card");
		await expect(cards).toHaveCount(5, { timeout: 10000 });
	});
});
