import { SapphireClient } from "@sapphire/framework";
import { Message, ClientOptions } from "discord.js";
import Redis, { Redis as IRedis } from "ioredis";
import { Prefix } from "./structures/Prefix";

export class PenguClient extends SapphireClient {

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public readonly redis: IRedis = new Redis();
    // eslint-disable-next-line @typescript-eslint/naming-convention
    public readonly prefix: Prefix;

    public constructor(options: ClientOptions) {
        super(options);

        this.prefix = new Prefix(this);

        this.fetchPrefix = (message: Message) => this.prefix.ensurePrefix(message.id);
    }

}

declare module "discord.js" {
    interface Client {
        redis: IRedis;
        prefix: Prefix;
    }
}
