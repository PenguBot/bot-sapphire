import { AnteiClient, AnteiClientOptions } from "@pengubot/antei";
import { PrismaClient } from "@prisma/client";

export class PenguClient extends AnteiClient {

    public prisma: PrismaClient;

    public constructor(options?: AnteiClientOptions) {
        super({ ...options });

        this.prisma = new PrismaClient();
    }
}
