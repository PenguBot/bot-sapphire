import { Command, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { fetch } from "@utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import { PreConditions } from "@lib/types/Types";

@ApplyOptions<CommandOptions>({
    description: "commands/images:cat.description",
    detailedDescription: "noDetailedDescription",
    aliases: ["catfact"],
    preconditions: [PreConditions.Permissions]
})
export class PenguCommand extends Command {

    public async run(message: Message) {
        const { fact } = await fetch("https://catfact.ninja/fact");
        if (!fact) return message.sendTranslated("basicError");

        return message.channel.send(new MessageEmbed()
            .setFooter(`PenguBot.com - ${await message.fetchLanguageKey("poweredBy")} catfact.ninja`)
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`**${(await message.fetchLanguageKey("commands/images:cat.embedTitle"))}**\n${fact}`)
            .setImage(`http://thecatapi.com/api/images/get?format=src&type=jpg&size=med&${Date.now()}`));
    }

}
