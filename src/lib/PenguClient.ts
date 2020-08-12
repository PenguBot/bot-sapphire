import { KlasaClient, KlasaClientOptions } from "klasa";
import { container } from "tsyringe";
import { LanguageHandler } from "./structures/LanguageHandler";

export class PenguClient extends KlasaClient {
    i18n: LanguageHandler;

    public constructor(options?: KlasaClientOptions) {
        super({ ...options });

        container.registerInstance(PenguClient, this);
		this.i18n = new LanguageHandler(this);
    }
}
