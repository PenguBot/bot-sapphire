/* eslint-disable @typescript-eslint/naming-convention */
import { SapphireClient } from "@sapphire/framework";
import { ClientOptions, Message } from "discord.js";
import Redis, { Redis as IRedis } from "ioredis";
import { join } from "path";
import { container } from "tsyringe";
import { LanguageHandler } from "@lib/structures/LanguageHandler";
import { Prefix } from "@lib/structures/Prefix";

import "./extensions/PenguMessage";

export class PenguClient extends SapphireClient {

    public readonly redis: IRedis = new Redis();
    public readonly prefix: Prefix;
    public readonly languages: LanguageHandler;

    public constructor(options?: ClientOptions) {
        super(options);

        this.prefix = new Prefix(this);
        this.languages = new LanguageHandler(join(__dirname, "..", "languages"));

        this.fetchPrefix = (message: Message) => this.prefix.ensurePrefix(message.id);

        container.registerInstance(PenguClient, this);
    }

}

declare module "discord.js" {
    interface Client {
        redis: IRedis;
        prefix: Prefix;
        languages: LanguageHandler;
    }
}
