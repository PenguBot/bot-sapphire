import { Message } from "discord.js";
import { UserError, ok, err, Precondition, Awaited, Result } from "@sapphire/framework";

export class PermissionCondition extends Precondition {

    public run(message: Message): Awaited<Result<unknown, UserError>> {
        if (message.channel.type === "dm") return ok();
        if (!message.member) return err(new UserError("permissions", "Member is null."));

        const clientPermissions = message.member?.permissionsIn(message.channel);
        return clientPermissions?.has(379968) ? ok() : err(new UserError("permissions", "Missing permissions."));
    }

}
