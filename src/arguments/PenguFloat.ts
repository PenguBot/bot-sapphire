import { Argument, ArgumentContext, err, ok, Result, UserError } from "@sapphire/framework";
import type { PieceContext } from "@sapphire/pieces";

export class PenguArgument extends Argument {
	public constructor(context: PieceContext) {
		super(context, { name: "float" });
	}

	public async run(argument: string, context: ArgumentContext): Promise<Result<number, UserError>> {
        const parsed = Number(argument);

		if (Number.isNaN(parsed)) {
			return err(new UserError("ArgumentFloatInvalidNaN", await context.message.translate("arguments/float:ARGUMENT_FLOAT_INVALID_NAN")));
		}
		if (Number.isSafeInteger(parsed)) {
			return err(new UserError("ArgumentFloatInvalidDecimal", await context.message.translate("arguments/float:ARGUMENT_FLOAT_INVALID_DECIMAL")));
		}
		if (typeof context.minimum === "number" && parsed < context.minimum) {
			return err(new UserError("ArgumentFloatTooSmall", await context.message.translate("arguments/float:ARGUMENT_FLOAT_TOO_SMALL")));
		}
		if (typeof context.maximum === "number" && parsed > context.maximum) {
			return err(new UserError("ArgumentFloatTooBig", await context.message.translate("arguments/float:ARGUMENT_FLOAT_TOO_BIG")));
		}

		return ok(parsed);
	}
}
