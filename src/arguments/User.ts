/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Argument, ArgumentContext, err, ok, Result, UserError } from "@sapphire/framework";
import type { PieceContext } from "@sapphire/pieces";
import type { User } from "discord.js";

export class PenguArgument extends Argument {
    public userIDRegex = /^(?:<@!?)?(\d{17,19})>?$/;

	public constructor(context: PieceContext) {
		super(context, { name: "user" });
	}

	public async run(argument: string, context: ArgumentContext): Promise<Result<User, UserError>> {
        if (!argument) return err(new UserError("UserArgument", await context.message.fetchLanguageKey("arguments/user:NOT_PROVIDED")));

        const id = this.userIDRegex.exec(argument);
        const user = id ? await this.client.users.fetch(id![1]).catch(() => null) : null;

        if (!user) return err(new UserError("UserArgument", await context.message.fetchLanguageKey("arguments/user:NOT_FOUND")));
		return ok(user);
	}
}
