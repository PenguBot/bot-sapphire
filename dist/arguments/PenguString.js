"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguArgument = void 0;
const framework_1 = require("@sapphire/framework");
class PenguArgument extends framework_1.Argument {
    constructor(context) {
        super(context, { name: "string" });
    }
    async run(argument, context) {
        if (typeof context.minimum === "number" && argument.length < context.minimum) {
            return framework_1.err(new framework_1.UserError("ArgumentStringTooShort", await context.message.translate("arguments/string:ARGUMENT_STRING_TOO_SHORT")));
        }
        if (typeof context.maximum === "number" && argument.length > context.maximum) {
            return framework_1.err(new framework_1.UserError("ArgumentStringTooLong", await context.message.translate("arguments/string:ARGUMENT_STRING_TOO_LONG")));
        }
        return framework_1.ok(argument);
    }
}
exports.PenguArgument = PenguArgument;
//# sourceMappingURL=PenguString.js.map