import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class SumCommand extends Command {
    public async run(message: Message, args: Args) {
        const a = await args.pick("integer");
        const b = await args.pick("integer");
        return message.channel.send(`Sum is ${a + b}`);
    }
}
