"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguClient = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const ioredis_1 = tslib_1.__importDefault(require("ioredis"));
const path_1 = require("path");
const tsyringe_1 = require("tsyringe");
const LanguageHandler_1 = require("@lib/structures/LanguageHandler");
const Prefix_1 = require("@lib/structures/Prefix");
class PenguClient extends framework_1.SapphireClient {
    redis = new ioredis_1.default();
    prefix;
    languages;
    constructor(options) {
        super(options);
        this.prefix = new Prefix_1.Prefix(this);
        this.languages = new LanguageHandler_1.LanguageHandler(path_1.join(__dirname, "..", "languages"));
        this.fetchPrefix = (message) => this.prefix.ensurePrefix(message.id);
        tsyringe_1.container.registerInstance(PenguClient, this);
        throw Error("eyyy");
    }
}
exports.PenguClient = PenguClient;
//# sourceMappingURL=https://raw.githubusercontent.com/PenguBot/bot/build/dist/lib/PenguClient.js.map