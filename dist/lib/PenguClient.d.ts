import { LanguageHandler } from "@lib/structures/LanguageHandler";
import { CacheManager } from "@lib/structures/CacheManager";
import { SapphireClient } from "@sapphire/framework";
import { ClientOptions } from "discord.js";
import { Redis as IRedis } from "ioredis";
import "./extensions/PenguMessage";
export declare class PenguClient extends SapphireClient {
    readonly redis: IRedis;
    readonly cache: CacheManager;
    readonly languages: LanguageHandler;
    constructor(options?: ClientOptions);
}
declare module "discord.js" {
    interface Client {
        readonly redis: IRedis;
        readonly cache: CacheManager;
        readonly languages: LanguageHandler;
    }
}
