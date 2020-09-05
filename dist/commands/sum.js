"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const framework_1 = require("@sapphire/framework");
class PenguCommand extends framework_1.Command {
    async run(message, args) {
        const ints = await args.repeat("number");
        return message.channel.send(`Sum is ${ints.reduce((a, b) => a + b, 0)}`);
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=sum.js.map