import { Args, Command } from "@sapphire/framework";
import { Message } from "discord.js";

export class PenguCommand extends Command {

    public async run(message: Message, args: Args) {
        const ints = await args.repeat("number");
        return message.channel.send(`Sum is ${ints.reduce((a: number, b: number) => a + b, 0)}`);
    }

}
