import { Argument, ArgumentContext, Awaited, err, ok, Result, UserError } from "@sapphire/framework";
import type { PieceContext } from "@sapphire/pieces";

export class PenguArgument extends Argument {
	public constructor(context: PieceContext) {
		super(context, { name: "string" });
	}

	public run(argument: string, context: ArgumentContext): Awaited<Result<string, UserError>> {
		if (typeof context.minimum === "number" && argument.length < context.minimum) {
			return err(new UserError("ArgumentStringTooShort", "The argument is too short."));
		}
		if (typeof context.maximum === "number" && argument.length > context.maximum) {
			return err(new UserError("ArgumentStringTooLong", "The argument is too long."));
		}

		return ok(argument);
	}
}
