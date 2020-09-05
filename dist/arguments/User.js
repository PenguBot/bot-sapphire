"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguArgument = void 0;
const framework_1 = require("@sapphire/framework");
class PenguArgument extends framework_1.Argument {
    userIDRegex = /^(?:<@!?)?(\d{17,19})>?$/;
    constructor(context) {
        super(context, { name: "user" });
    }
    async run(argument, context) {
        if (!argument)
            return framework_1.err(new framework_1.UserError("UserArgument", await context.message.fetchLanguageKey("arguments/user:notProvided")));
        const id = this.userIDRegex.exec(argument);
        const user = id ? await this.client.users.fetch(id[1]).catch(() => null) : null;
        if (!user)
            return framework_1.err(new framework_1.UserError("UserArgument", await context.message.fetchLanguageKey("arguments/user:notFound")));
        return framework_1.ok(user);
    }
}
exports.PenguArgument = PenguArgument;
//# sourceMappingURL=User.js.map