"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SumCommand = void 0;
const framework_1 = require("@sapphire/framework");
class SumCommand extends framework_1.Command {
    async run(message, args) {
        const a = await args.pick("integer");
        const b = await args.pick("integer");
        return message.channel.send(`Sum is ${a + b}`);
    }
}
exports.SumCommand = SumCommand;
//# sourceMappingURL=sum.js.map