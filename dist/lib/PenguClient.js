"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguClient = void 0;
const tslib_1 = require("tslib");
const CacheManager_1 = require("@lib/structures/CacheManager");
const config_1 = require("@root/config");
const framework_1 = require("@sapphire/framework");
const ioredis_1 = tslib_1.__importDefault(require("ioredis"));
const path_1 = require("path");
const tsyringe_1 = require("tsyringe");
require("@scp/in17n/register");
class PenguClient extends framework_1.SapphireClient {
    redis = new ioredis_1.default();
    cache;
    constructor(options) {
        super(options);
        this.cache = new CacheManager_1.CacheManager(this);
        this.fetchPrefix = (message) => message.guild ? this.cache.getPrefix(message.guild.id) : config_1.PREFIX;
        this.fetchLanguage = (message) => message.guild ? this.cache.getLanguage(message.guild.id) : "en-US";
        this.arguments.registerPath(path_1.join(__dirname, "..", "arguments"));
        this.commands.registerPath(path_1.join(__dirname, "..", "commands"));
        this.events.registerPath(path_1.join(__dirname, "..", "events"));
        this.preconditions.registerPath(path_1.join(__dirname, "..", "preconditions"));
        tsyringe_1.container.registerInstance(PenguClient, this);
    }
}
exports.PenguClient = PenguClient;
//# sourceMappingURL=PenguClient.js.map