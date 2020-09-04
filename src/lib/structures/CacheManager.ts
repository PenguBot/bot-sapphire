/* eslint-disable @typescript-eslint/naming-convention */
import { PenguClient } from "@lib/PenguClient";
import { DbSet } from "@lib/structures/DbSet";
import { CacheKey } from "@utils/Enums";

export class CacheManager {
    private readonly client: PenguClient;

    public constructor(client: PenguClient) {
        this.client = client;
    }

    public set(key: string, value: string, type: CacheKey) {
        return this.client.redis.set(`${type}${CacheManager.SEPERATOR}${key}`, value);
    }

    public get(key: string, type: CacheKey) {
        return this.client.redis.get(`${type}${CacheManager.SEPERATOR}${key}`);
    }

    public async has(key: string, type: CacheKey) {
        const value = await this.get(key, type);
        return value !== null;
    }

    public async getPrefix(id: string) {
        const prefix = await this.get(id, CacheKey.GuildPrefix);
        if (prefix !== null) return prefix;

        const settings = await this.ensureGuildSettings(id);

        await this.set(id, settings.prefix, CacheKey.GuildPrefix);
        await settings.save();

        return settings.prefix;
    }

    public async getLanguage(id: string) {
        const lang = await this.get(id, CacheKey.GuildLanguage);
        if (lang !== null) return lang;

        const settings = await this.ensureGuildSettings(id);

        await this.set(id, settings.language, CacheKey.GuildLanguage);
        await settings.save();

        return settings.language;
    }

    public async ensureGuildSettings(id: string) {
        const { guilds } = await DbSet.connect();
        return guilds.ensure(id);
    }

    public static readonly SEPERATOR = "_";

}
