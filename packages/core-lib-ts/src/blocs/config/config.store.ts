import { Store } from "../store";
import { ConfigType } from "./config.model";

export type ConfigBlocState = {
    config: ConfigType;
};


class CardStore extends Store<ConfigBlocState> {

    constructor() {
        super("poke_cards_state");
    }

    static _getInstance(): CardStore {
        return new CardStore();
    }
}

export const configStore = CardStore._getInstance();