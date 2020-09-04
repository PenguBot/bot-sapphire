import { Command } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { fetch } from "@utils/util";

export class PenguCommand extends Command {

    public async run(message: Message) {
        const body: DogAPIResult = await fetch("https://dog.ceo/api/breeds/image/random");
        if (body.status !== "success") return message.sendTranslated("BASIC_ERROR");

        return message.channel.send(new MessageEmbed()
            .setFooter("© PenguBot.com - Powered by dog.ceo")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(body.message));
    }

}

interface DogAPIResult {
    message: string,
    status: "success" | "error"
}
