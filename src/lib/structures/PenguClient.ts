import { KlasaClient, KlasaClientOptions } from "@pengubot/antei";
import { PrismaClient } from "@prisma/client";

export class PenguClient extends KlasaClient {

    public prisma: PrismaClient;

    public constructor(options?: KlasaClientOptions) {
        super({ ...options });

        this.prisma = new PrismaClient();
    }
}
