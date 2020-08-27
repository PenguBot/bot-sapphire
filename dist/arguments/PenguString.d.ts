import { Argument, ArgumentContext, Result, UserError } from "@sapphire/framework";
import type { PieceContext } from "@sapphire/pieces";
export declare class PenguArgument extends Argument {
    constructor(context: PieceContext);
    run(argument: string, context: ArgumentContext): Promise<Result<string, UserError>>;
}
