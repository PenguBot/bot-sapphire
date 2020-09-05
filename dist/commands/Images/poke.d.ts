import { Command, Args } from "@sapphire/framework";
import { Message } from "discord.js";
export declare class PenguCommand extends Command {
    run(message: Message, args: Args): Promise<Message>;
}
