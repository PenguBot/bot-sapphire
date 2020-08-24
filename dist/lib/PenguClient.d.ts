import { SapphireClient } from "@sapphire/framework";
import { ClientOptions } from "discord.js";
import { Redis as IRedis } from "ioredis";
import { LanguageHandler } from "@lib/structures/LanguageHandler";
import { Prefix } from "@lib/structures/Prefix";
export declare class PenguClient extends SapphireClient {
    readonly redis: IRedis;
    readonly prefix: Prefix;
    readonly languages: LanguageHandler;
    constructor(options?: ClientOptions);
}
declare module "discord.js" {
    interface Client {
        redis: IRedis;
        prefix: Prefix;
    }
}
