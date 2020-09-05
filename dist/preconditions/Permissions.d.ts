import { Message } from "discord.js";
import { UserError, Precondition, Awaited, Result } from "@sapphire/framework";
export declare class PermissionCondition extends Precondition {
    run(message: Message): Awaited<Result<unknown, UserError>>;
}
