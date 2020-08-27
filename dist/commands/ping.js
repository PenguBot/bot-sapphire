"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const framework_1 = require("@sapphire/framework");
class PingCommand extends framework_1.Command {
    run(message) {
        return message.channel.send("Pong!");
    }
}
exports.PingCommand = PingCommand;
//# sourceMappingURL=ping.js.map