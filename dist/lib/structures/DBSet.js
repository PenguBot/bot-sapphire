"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSet = void 0;
const dbConfig_1 = require("@orm/dbConfig");
const GuildRepository_1 = require("@orm/repositories/GuildRepository");
class DbSet {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    get guilds() {
        return this.connection.getCustomRepository(GuildRepository_1.GuildRepository);
    }
    static async connect() {
        return new DbSet(await dbConfig_1.connect());
    }
}
exports.DbSet = DbSet;
//# sourceMappingURL=https://raw.githubusercontent.com/PenguBot/bot/build/dist/lib/structures/DBSet.js.map