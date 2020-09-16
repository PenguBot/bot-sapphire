import { Command, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { fetch } from "@utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import { PreConditions } from "@lib/types/Types";

@ApplyOptions<CommandOptions>({
    description: "commands/images:fox.description",
    detailedDescription: "noDetailedDescription",
    preconditions: [PreConditions.Permissions]
})
export class PenguCommand extends Command {

    public async run(message: Message) {
        const body: FoxAPIResult = await fetch("https://randomfox.ca/floof/");
        if (!body.image) return message.sendTranslated("basicError");

        return message.channel.send(new MessageEmbed()
            .setFooter(`PenguBot.com - ${await message.fetchLanguageKey("poweredBy")} randomfox.ca`)
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(body.image));
    }

}

interface FoxAPIResult {
    image: string
    link: string
}
