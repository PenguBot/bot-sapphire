import { Command } from "@sapphire/framework";
import { Message } from "discord.js";
export declare class PenguCommand extends Command {
    subReddits: string[];
    run(message: Message): Promise<Message>;
}
