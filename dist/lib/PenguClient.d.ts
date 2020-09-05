import { CacheManager } from "@lib/structures/CacheManager";
import { SapphireClient } from "@sapphire/framework";
import { ClientOptions } from "discord.js";
import { Redis as IRedis } from "ioredis";
import "@scp/in17n/register";
export declare class PenguClient extends SapphireClient {
    readonly redis: IRedis;
    readonly cache: CacheManager;
    constructor(options?: ClientOptions);
}
