"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbSet = void 0;
const dbConfig_1 = require("@orm/dbConfig");
const GuildRepository_1 = require("@orm/repositories/GuildRepository");
const UserRepository_1 = require("@orm/repositories/UserRepository");
class DbSet {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    get guilds() {
        return this.connection.getCustomRepository(GuildRepository_1.GuildRepository);
    }
    get users() {
        return this.connection.getCustomRepository(UserRepository_1.UserRepository);
    }
    static async connect() {
        return new DbSet(await dbConfig_1.connect());
    }
}
exports.DbSet = DbSet;
//# sourceMappingURL=DbSet.js.map