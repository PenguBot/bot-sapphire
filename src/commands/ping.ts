import { Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class PingCommand extends Command {
    public run(message: Message) {
        return message.channel.send("Pong!");
    }
}
