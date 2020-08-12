import { KlasaClient, KlasaClientOptions } from "klasa";
import { LanguageHandler } from "./LanguageHandler";

export class PenguClient extends KlasaClient {
    i18n: LanguageHandler;

    public constructor(options?: KlasaClientOptions) {
        super({ ...options });

		this.i18n = new LanguageHandler(this);
    }
}
