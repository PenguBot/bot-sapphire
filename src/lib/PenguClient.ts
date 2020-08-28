/* eslint-disable @typescript-eslint/naming-convention */
import { LanguageHandler } from "@lib/structures/LanguageHandler";
import { CacheManager } from "@lib/structures/CacheManager";
import { PREFIX } from "@root/config";
import { SapphireClient } from "@sapphire/framework";
import { ClientOptions, Message } from "discord.js";
import Redis, { Redis as IRedis } from "ioredis";
import { join } from "path";
import { container } from "tsyringe";

import "./extensions/PenguMessage";

export class PenguClient extends SapphireClient {

    public readonly redis: IRedis = new Redis();
    public readonly cache: CacheManager;
    public readonly languages: LanguageHandler;

    public constructor(options?: ClientOptions) {
        super(options);

        this.cache = new CacheManager(this);
        this.languages = new LanguageHandler(join(__dirname, "..", "languages"));

        this.fetchPrefix = (message: Message) => message.guild ? this.cache.getPrefix(message.guild.id) : PREFIX;

        this.arguments.registerPath(join(__dirname, "..", "arguments"));
        this.commands.registerPath(join(__dirname, "..", "commands"));
        this.events.registerPath(join(__dirname, "..", "events"));

        container.registerInstance(PenguClient, this);
    }

}
