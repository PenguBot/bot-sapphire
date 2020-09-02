import { Command } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { fetch } from "@utils/util";

export class CatCommand extends Command {

    public async run(message: Message) {
        const { fact } = await fetch("https://catfact.ninja/fact");
        if (!fact) return message.sendLocale("default:BASIC_ERROR");

        return message.send(new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`**${(await message.translate("commands/images:CAT_TITLE"))}**\n${fact}`)
            .setImage(`http://thecatapi.com/api/images/get?format=src&type=jpg&size=med&${Date.now()}`));
    }

}
