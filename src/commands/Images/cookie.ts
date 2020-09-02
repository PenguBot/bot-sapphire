import { Command, Args } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";

export class PenguCommand extends Command {

    public readonly images: Array<string> = [
        "http://i.imgur.com/SLwEY66.gif", "http://i.imgur.com/K6VoNp3.gif", "http://i.imgur.com/knVM6Lb.gif",
        "http://i.imgur.com/P1BMly5.gif", "http://i.imgur.com/I8CrTUT.gif", "https://i.imgur.com/0XTueQR.png",
        "https://i.imgur.com/u9k8x4J.png", "https://i.imgur.com/AUtfHnK.png", "https://i.imgur.com/XjTbrKc.png",
        "https://i.imgur.com/A3mgqEh.png", "https://i.imgur.com/YnkdGZd.png", "https://i.imgur.com/FJsOnOE.png",
        "https://i.imgur.com/RQFPwDg.png", "https://i.imgur.com/vyCTGr0.png", "https://i.imgur.com/kkXToc8.png",
        "https://i.imgur.com/ctHwqVL.png", "https://i.imgur.com/yUaCPvC.png", "https://i.imgur.com/IUM6Z8F.png"
    ];

    public async run(message: Message, args: Args) {
        const randomImage = this.images[Math.floor(Math.random() * this.images.length)];
        const embed = new MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(randomImage);

        // @todo placeholder till we make a user/memeber argument
        return message.channel.send(await message.fetchLanguageKey("commands/images:COOKIE", { by: message.author.username, to: args.pick("string") }), { embed });
    }
}
