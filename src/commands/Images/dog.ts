import { Command, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { fetch } from "@utils/utils";
import { ApplyOptions } from "@sapphire/decorators";
import { PreConditions } from "@lib/types/Types";

@ApplyOptions<CommandOptions>({
    description: "commands/images:dog.description",
    detailedDescription: "noDetailedDescription",
    preconditions: [PreConditions.Permissions]
})
export class PenguCommand extends Command {

    public async run(message: Message) {
        const body: DogAPIResult = await fetch("https://dog.ceo/api/breeds/image/random");
        if (body.status !== "success") return message.sendTranslated("basicError");

        return message.channel.send(new MessageEmbed()
            .setFooter(`PenguBot.com - ${await message.fetchLanguageKey("poweredBy")} dog.ceo`)
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(body.message));
    }

}

interface DogAPIResult {
    message: string,
    status: "success" | "error"
}
