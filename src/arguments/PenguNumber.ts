import { Argument, ArgumentContext, err, ok, Result, UserError } from "@sapphire/framework";
import type { PieceContext } from "@sapphire/pieces";

export class PenguArgument extends Argument {
	public constructor(context: PieceContext) {
		super(context, { name: "number" });
	}

	public async run(argument: string, context: ArgumentContext): Promise<Result<number, UserError>> {
        const parsed = Number(argument);

		if (Number.isNaN(parsed)) {
			return err(new UserError("ArgumentNumberInvalid", await context.message.fetchLanguageKey("arguments/core:float.invalid")));
		}
		if (typeof context.minimum === "number" && parsed < context.minimum) {
			return err(new UserError("ArgumentNumberTooSmall", await context.message.fetchLanguageKey("arguments/core:float.tooSmall")));
		}
		if (typeof context.maximum === "number" && parsed > context.maximum) {
			return err(new UserError("ArgumentNumberTooBig", await context.message.fetchLanguageKey("arguments/core:float.tooBig")));
		}

		return ok(parsed);
	}
}
