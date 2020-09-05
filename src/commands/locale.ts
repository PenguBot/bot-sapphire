import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class PenguCommand extends Command {

    public async run(message: Message, args: Args) {
        return message.sendTranslated(await args.pick("string"));
    }

}
