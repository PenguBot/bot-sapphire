import { PenguClient } from "@lib/PenguClient";
import { UserError } from "@sapphire/framework";
import { Events } from "@utils/Enums";
import { container } from "tsyringe";

const oldConstructor = UserError.prototype.constructor;

UserError.prototype.constructor = function constructor(type: string, message: string) {
    oldConstructor(type, message);

    const client = container.resolve(PenguClient);
    client.emit(Events.UserError, type, message);
};
