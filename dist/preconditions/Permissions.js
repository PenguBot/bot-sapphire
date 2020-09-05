"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionCondition = void 0;
const framework_1 = require("@sapphire/framework");
class PermissionCondition extends framework_1.Precondition {
    run(message) {
        if (message.channel.type === "dm")
            return framework_1.ok();
        if (!message.member)
            return framework_1.err(new framework_1.UserError("permissions", "Member is null."));
        const clientPermissions = message.member?.permissionsIn(message.channel);
        return clientPermissions?.has(378944) ? framework_1.ok() : framework_1.err(new framework_1.UserError("permissions", "Missing permissions."));
    }
}
exports.PermissionCondition = PermissionCondition;
//# sourceMappingURL=Permissions.js.map