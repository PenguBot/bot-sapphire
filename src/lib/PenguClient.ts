import { KlasaClient, KlasaClientOptions } from "klasa";
import { container } from "tsyringe";

export class PenguClient extends KlasaClient {

    public constructor(options?: KlasaClientOptions) {
        super({ ...options });

        container.registerInstance(PenguClient, this);
    }
}
