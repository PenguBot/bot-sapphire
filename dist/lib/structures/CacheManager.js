"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheManager = void 0;
const DbSet_1 = require("@lib/structures/DbSet");
class CacheManager {
    client;
    constructor(client) {
        this.client = client;
    }
    set(key, value, type) {
        return this.client.redis.set(`${type}${CacheManager.SEPERATOR}${key}`, value);
    }
    get(key, type) {
        return this.client.redis.get(`${type}${CacheManager.SEPERATOR}${key}`);
    }
    async has(key, type) {
        const value = await this.get(key, type);
        return value !== null;
    }
    async getPrefix(id) {
        const prefix = await this.get(id, "guild_prefix");
        if (prefix !== null)
            return prefix;
        const settings = await this.ensureGuildSettings(id);
        await this.set(id, settings.prefix, "guild_prefix");
        await settings.save();
        return settings.prefix;
    }
    async getLanguage(id) {
        const lang = await this.get(id, "guild_language");
        if (lang !== null)
            return lang;
        const settings = await this.ensureGuildSettings(id);
        await this.set(id, settings.language, "guild_language");
        await settings.save();
        return settings.language;
    }
    async ensureGuildSettings(id) {
        const { guilds } = await DbSet_1.DbSet.connect();
        return guilds.ensure(id);
    }
    static SEPERATOR = "_";
}
exports.CacheManager = CacheManager;
//# sourceMappingURL=CacheManager.js.map