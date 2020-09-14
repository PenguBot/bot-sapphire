"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguArgument = void 0;
const framework_1 = require("@sapphire/framework");
class PenguArgument extends framework_1.Argument {
    constructor(context) {
        super(context, { name: "number" });
    }
    async run(argument, context) {
        const parsed = Number(argument);
        if (Number.isNaN(parsed)) {
            return framework_1.err(new framework_1.UserError("ArgumentNumberInvalid", await context.message.fetchLanguageKey("arguments/core:float.invalid")));
        }
        if (typeof context.minimum === "number" && parsed < context.minimum) {
            return framework_1.err(new framework_1.UserError("ArgumentNumberTooSmall", await context.message.fetchLanguageKey("arguments/core:float.tooSmall")));
        }
        if (typeof context.maximum === "number" && parsed > context.maximum) {
            return framework_1.err(new framework_1.UserError("ArgumentNumberTooBig", await context.message.fetchLanguageKey("arguments/core:float.tooBig")));
        }
        return framework_1.ok(parsed);
    }
}
exports.PenguArgument = PenguArgument;
//# sourceMappingURL=PenguNumber.js.map