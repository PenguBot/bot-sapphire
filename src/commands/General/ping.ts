import { Command, CommandOptions } from "@sapphire/framework";
import { Message } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<CommandOptions>({
    description: "commands/general:ping.description"
})
export class PenguCommand extends Command {

    public run(message: Message) {
        return message.sendTranslated("commands/general:ping.response");
    }

}
