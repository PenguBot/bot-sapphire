"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleCommand = void 0;
const framework_1 = require("@sapphire/framework");
class LocaleCommand extends framework_1.Command {
    async run(message, args) {
        return message.sendLocale(await args.pick("string"), { key: "test" });
    }
}
exports.LocaleCommand = LocaleCommand;
//# sourceMappingURL=locale.js.map