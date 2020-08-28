"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SumCommand = void 0;
const framework_1 = require("@sapphire/framework");
class SumCommand extends framework_1.Command {
    async run(message, args) {
        const ints = await args.repeat("number");
        return message.channel.send(`Sum is ${ints.reduce((a, b) => a + b, 0)}`);
    }
}
exports.SumCommand = SumCommand;
//# sourceMappingURL=sum.js.map