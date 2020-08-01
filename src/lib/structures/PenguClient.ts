import { AnteiClient, AnteiClientOptions } from "@pengubot/antei";

export class PenguClient extends AnteiClient {

    public constructor(options?: AnteiClientOptions) {
        super({ ...options });
    }
}
