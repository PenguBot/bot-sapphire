import { Command, Args, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { fetch } from "@utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import { PreConditions } from "@lib/types/Types";

@ApplyOptions<CommandOptions>({
    description: "commands/images:poke.description",
    detailedDescription: "commands/images:poke.detailedDescription",
    preconditions: [PreConditions.Permissions]
})
export class PenguCommand extends Command {

    public async run(message: Message, args: Args) {
        const mentioned = await args.pick("user");

        const { url } = await fetch("https://nekos.life/api/v2/img/poke");
        if (!url) return message.sendTranslated("basicError");

        const embed = new MessageEmbed()
            .setFooter("PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(url);

        return message.channel.send(await message.fetchLanguageKey("commands/images:poke.response", { from: `${message.author}`, to: `${mentioned}` }), { embed });
    }
}
