import { Command, Args } from "@sapphire/framework";
import { Message, User } from "discord.js";
export declare class PenguCommand extends Command {
    run(message: Message, args: Args): Promise<Message>;
    fetchGametag(author: User): Promise<string | undefined>;
}
