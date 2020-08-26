import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class LocaleCommand extends Command {
    public async run(message: Message, args: Args) {
        return message.sendLocale(await args.pick("string"), { key: "test" });
    }
}
