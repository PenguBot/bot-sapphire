import { Command } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { fetch } from "@utils/util";

export class PenguCommand extends Command {

    public async run(message: Message) {
        const { fact } = await fetch("https://catfact.ninja/fact");
        if (!fact) return message.sendTranslated("basicError");

        return message.channel.send(new MessageEmbed()
            .setFooter("© PenguBot.com - Powered by catfact.ninja")
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`**${(await message.fetchLanguageKey("commands/images:catTitle"))}**\n${fact}`)
            .setImage(`http://thecatapi.com/api/images/get?format=src&type=jpg&size=med&${Date.now()}`));
    }

}
