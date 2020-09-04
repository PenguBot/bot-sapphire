import { Command } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { fetch } from "@utils/util";

export class PenguCommand extends Command {

    public async run(message: Message) {
        const body: FoxAPIResult = await fetch("https://randomfox.ca/floof/");
        if (!body.image) return message.sendTranslated("basicError");

        return message.channel.send(new MessageEmbed()
            .setFooter("© PenguBot.com - Powered by randomfox.ca")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(body.image));
    }

}

interface FoxAPIResult {
    image: string
    link: string
}
