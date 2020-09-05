"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const framework_1 = require("@sapphire/framework");
class PenguCommand extends framework_1.Command {
    run(message) {
        return message.channel.send("Pong!");
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=ping.js.map