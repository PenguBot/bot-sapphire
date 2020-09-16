import { Command, Args, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import { PreConditions } from "@lib/types/Types";

@ApplyOptions<CommandOptions>({
    description: "commands/images:punch.description",
    detailedDescription: "commands/images:punch.detailedDescription",
    preconditions: [PreConditions.Permissions]
})
export class PenguCommand extends Command {

    public readonly images: Array<string> = [
        "http://i.imgur.com/aGPHQ3E.gif", "http://i.imgur.com/FxFfdOZ.gif", "http://i.imgur.com/XA7PPiy.gif",
        "http://i.imgur.com/5hcVtGf.gif", "http://i.imgur.com/nwGsg12.gif", "http://i.imgur.com/GZX1COH.gif",
        "https://i.imgur.com/UcycckQ.gif", "https://i.imgur.com/VmdBxgq.gif", "https://i.imgur.com/IputsOi.gif",
        "https://i.imgur.com/UY3sTpj.gif", "https://i.imgur.com/VdwTwRo.gif", "https://i.imgur.com/VIKEo7q.gif",
        "https://i.imgur.com/XPq1P4F.gif", "https://i.imgur.com/X0uIstL.gif", "https://i.imgur.com/Of2BTLu.gif",
        "https://i.imgur.com/tSjlgKs.gif", "https://i.imgur.com/hEDcADi.gif"
    ];

    public async run(message: Message, args: Args) {
        const mentioned = await args.pick("user");
        const randomImage = this.images[Math.floor(Math.random() * this.images.length)];

        const embed = new MessageEmbed()
            .setFooter("PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(randomImage);

        return message.channel.send(await message.fetchLanguageKey("commands/images:punch.response", { from: `${message.author}`, to: `${mentioned}` }), { embed });
    }
}
