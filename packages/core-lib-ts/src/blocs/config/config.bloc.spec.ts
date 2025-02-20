import axios from "axios";
import { describe, expect, it, vi } from "vitest";
import config200 from "../../../fixtures/config-200.json";
import { configBloc } from "./config.bloc";
import { configStore } from "./config.store";

vi.mock("axios");

describe("ConfigBloc", () => {
  it("should load config and update state", async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce(config200);
    await configBloc.loadConfig();

    const config = configStore.getState().config;

    expect(config.apiBaseUrl).toEqual("https://api.pokemontcg.io/v2/");
    expect(config.apiKey).toEqual("5281dd39-1063-449e-9e73-4dbca1993a52");
  });
});
