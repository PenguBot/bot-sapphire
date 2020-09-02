/* eslint-disable @typescript-eslint/naming-convention */
import { CacheManager } from "@lib/structures/CacheManager";
import { Redis as IRedis } from "ioredis";

declare module "discord.js" {
    interface Client {
        readonly redis: IRedis;
        readonly cache: CacheManager;
    }
}

declare module "@sapphire/framework" {
    interface ArgType {
        float: number;
        number: number;
    }
}
