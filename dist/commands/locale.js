"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const framework_1 = require("@sapphire/framework");
class PenguCommand extends framework_1.Command {
    async run(message, args) {
        return message.sendTranslated(await args.pick("string"));
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=locale.js.map