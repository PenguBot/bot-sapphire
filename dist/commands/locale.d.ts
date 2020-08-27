import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";
export declare class LocaleCommand extends Command {
    run(message: Message, args: Args): Promise<Message>;
}
