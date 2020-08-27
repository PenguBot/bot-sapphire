import { Command } from "@sapphire/framework";
import { Message } from "discord.js";
export declare class PingCommand extends Command {
    run(message: Message): Promise<Message>;
}
