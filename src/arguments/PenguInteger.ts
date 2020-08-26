import { Argument, ArgumentContext, err, ok, Result, UserError } from "@sapphire/framework";
import type { PieceContext } from "@sapphire/pieces";

export class PenguArgument extends Argument {
	public constructor(context: PieceContext) {
		super(context, { name: "integer" });
	}

	public async run(argument: string, context: ArgumentContext): Promise<Result<number, UserError>> {
		const parsed = Number(argument);

		if (!Number.isInteger(parsed)) {
			return err(new UserError("ArgumentIntegerInvalidNumber", await context.message.translate("arguments/integer:ARGUMENT_INTEGER_INVALID_NUMBER")));
		}
		if (typeof context.minimum === "number" && parsed < context.minimum) {
			return err(new UserError("ArgumentIntegerTooSmall", await context.message.translate("arguments/integer:ARGUMENT_INTEGER_TOO_SMALL")));
		}
		if (typeof context.maximum === "number" && parsed > context.maximum) {
			return err(new UserError("ArgumentIntegerTooBig", await context.message.translate("arguments/integer:ARGUMENT_INTEGER_TOO_BIG")));
		}

		return ok(parsed);
	}
}
