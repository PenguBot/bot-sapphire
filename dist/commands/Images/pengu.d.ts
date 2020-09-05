import { Command } from "@sapphire/framework";
import { Message } from "discord.js";
export declare class PenguCommand extends Command {
    readonly images: Array<string>;
    run(message: Message): Promise<Message>;
}
