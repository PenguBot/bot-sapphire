import { KlasaClient, KlasaClientOptions } from "klasa";

export class PenguClient extends KlasaClient {

    public constructor(options?: KlasaClientOptions) {
        super({ ...options });

    }
}
