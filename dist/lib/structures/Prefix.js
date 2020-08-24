"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prefix = void 0;
const DBSet_1 = require("@lib/structures/DBSet");
class Prefix {
    client;
    constructor(client) {
        this.client = client;
    }
    async ensurePrefix(id) {
        const prefix = await this.client.redis.get(`${Prefix.KEY_PREFIX}${id}`);
        if (prefix !== null)
            return prefix;
        return this.ensurePrefixCache(id);
    }
    async ensurePrefixCache(id) {
        const { guilds } = await DBSet_1.DbSet.connect();
        const settings = await guilds.ensure(id);
        await this.client.redis.set(`${Prefix.KEY_PREFIX}${id}`, settings.prefix);
        await settings.save();
        return settings.prefix;
    }
    static KEY_PREFIX = "guild_prefix_";
}
exports.Prefix = Prefix;
//# sourceMappingURL=https://raw.githubusercontent.com/PenguBot/bot/build/dist/lib/structures/Prefix.js.map