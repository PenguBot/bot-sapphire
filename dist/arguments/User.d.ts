import { Argument, ArgumentContext, Result, UserError } from "@sapphire/framework";
import type { PieceContext } from "@sapphire/pieces";
import type { User } from "discord.js";
export declare class PenguArgument extends Argument {
    userIDRegex: RegExp;
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): Promise<Result<User, UserError>>;
}
