"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.config = void 0;
const config_1 = require("@root/config");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
exports.config = {
    type: "postgres",
    host: config_1.PGSQL_DATABASE_HOST,
    port: config_1.PGSQL_DATABASE_PORT,
    username: config_1.PGSQL_DATABASE_USER,
    password: config_1.PGSQL_DATABASE_PASSWORD,
    database: config_1.PGSQL_DATABASE_NAME,
    entities: [
        path_1.join(__dirname, "entities/*.js")
    ],
    migrations: [
        path_1.join(__dirname, "migrations/*.js")
    ],
    cli: {
        entitiesDir: "src/lib/orm/entities",
        migrationsDir: "src/lib/orm/migrations",
        subscribersDir: "src/lib/orm/subscribers"
    },
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    logging: config_1.DEV
};
exports.connect = () => {
    try {
        return Promise.resolve(typeorm_1.getConnection());
    }
    catch {
        return typeorm_1.createConnection(exports.config);
    }
};
//# sourceMappingURL=https://raw.githubusercontent.com/PenguBot/bot/build/dist/lib/orm/dbConfig.js.map