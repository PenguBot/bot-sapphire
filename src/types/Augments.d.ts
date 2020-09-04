/* eslint-disable @typescript-eslint/naming-convention */
import { CacheManager } from "@lib/structures/CacheManager";
import { Redis as IRedis } from "ioredis";
import { User } from "discord.js";
import { Events } from "@utils/Enums";

declare module "discord.js" {
    interface Client {
        readonly redis: IRedis;
        readonly cache: CacheManager;
    }

    interface ClientEvents {
        [Events.UserError]: [string, string]
    }
}

declare module "@sapphire/framework" {
    interface ArgType {
        float: number;
        number: number;
        user: User;
    }
}
