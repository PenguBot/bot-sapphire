import { Command } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { fetch } from "@utils/util";

export class PenguCommand extends Command {

    public async run(message: Message) {
        const body: xkcdResult = await fetch("https://xkcd.com/info.0.json");
        if (!body.num) return message.sendTranslated("BASIC_ERROR");

        const randomNum = Math.floor(Math.random() * body.num) + 1;

        const res: xkcdResult = await fetch(`https://xkcd.com/${randomNum}/info.0.json`);
        if (!res.img) return message.sendTranslated("BASIC_ERROR");

        const embed = new MessageEmbed()
            .setFooter(`© PenguBot.com - ${await message.fetchLanguageKey("poweredBy")} xkcd.com`)
            .setTimestamp()
            .setAuthor(await message.fetchLanguageKey("commands/images:comic.embedTitle"), this.client.user?.displayAvatarURL(), "https://pengubot.com")
            .setColor("RANDOM")
            .setImage(res.img);

        return message.channel.send({ embed });
    }
}

interface xkcdResult {
    month: string
    num: number
    link?: string
    year: string
    news?: string
    safe_title: string
    transcript?: string
    alt: string
    img: string
    title: string
    day: string
}
