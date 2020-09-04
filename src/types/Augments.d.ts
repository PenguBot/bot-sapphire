/* eslint-disable @typescript-eslint/naming-convention */
import type { CacheManager } from "@lib/structures/CacheManager";
import type { Redis as IRedis } from "ioredis";
import type { User } from "discord.js";
// import type { Events } from "@utils/Enums";

declare module "discord.js" {
    interface Client {
        readonly redis: IRedis;
        readonly cache: CacheManager;
    }

    interface ClientEvents {
    }
}

declare module "@sapphire/framework" {
    interface ArgType {
        float: number;
        number: number;
        user: User;
    }
}
