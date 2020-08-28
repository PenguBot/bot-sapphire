/* eslint-disable @typescript-eslint/naming-convention */
import { CacheManager } from "@lib/structures/CacheManager";
import { LanguageHandler } from "@lib/structures/LanguageHandler";
import { Redis as IRedis } from "ioredis";

/* declare module "@sapphire/framework/dist/lib/utils/Args" {
    interface ArgType {
        float: number;
        pNumber: number;
    }
} */

declare module "discord.js" {
    interface Client {
        readonly redis: IRedis;
        readonly cache: CacheManager;
        readonly languages: LanguageHandler;
    }

    interface Message {
        send(content: StringResolvable, options?: MessageOptions): Promise<Message>;
        sendLocale(key: string, args?: Record<string, unknown>, options?: MessageOptions): Promise<Message>;
        translate(key: string, args?: Record<string, unknown>): Promise<string>;
    }
}
