"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguArgument = void 0;
const framework_1 = require("@sapphire/framework");
class PenguArgument extends framework_1.Argument {
    constructor(context) {
        super(context, { name: "float" });
    }
    async run(argument, context) {
        const parsed = Number(argument);
        if (Number.isNaN(parsed)) {
            return framework_1.err(new framework_1.UserError("ArgumentFloatInvalidNaN", await context.message.fetchLanguageKey("arguments/float:argumentFloatInvalidNaN")));
        }
        if (Number.isSafeInteger(parsed)) {
            return framework_1.err(new framework_1.UserError("ArgumentFloatInvalidDecimal", await context.message.fetchLanguageKey("arguments/float:argumentFloatInvalidDecimal")));
        }
        if (typeof context.minimum === "number" && parsed < context.minimum) {
            return framework_1.err(new framework_1.UserError("ArgumentFloatTooSmall", await context.message.fetchLanguageKey("arguments/float:argumentFloatTooSmall")));
        }
        if (typeof context.maximum === "number" && parsed > context.maximum) {
            return framework_1.err(new framework_1.UserError("ArgumentFloatTooBig", await context.message.fetchLanguageKey("arguments/float:argumentFloatTooBig")));
        }
        return framework_1.ok(parsed);
    }
}
exports.PenguArgument = PenguArgument;
//# sourceMappingURL=PenguFloat.js.map