import { Command, CommandOptions } from "@sapphire/framework";
import { Message, TextChannel } from "discord.js";
import { randomSubredditItem } from "@utils/util";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<CommandOptions>({
    description: "commands/images:wholesome.description",
    detailedDescription: "noDetailedDescription",
    preconditions: ["permissions"]
})
export class PenguCommand extends Command {

    public subReddits = ["wholesome", "aww", "AnimalsBeingBros"];

    public async run(message: Message) {
        const res = await randomSubredditItem(this.subReddits[Math.floor(Math.random() * this.subReddits.length)], "top");
        if (!res || !res.data) return message.sendTranslated("basicError");
        if (res.data.over_18 && !(message.channel as TextChannel).nsfw) return message.sendTranslated("commands/images:wholesome.nsfwPost");

        const completeResponse = [
            `**${await message.fetchLanguageKey("commands/images:reddit.title")}**: ${res.data.title}`,
            `**${await message.fetchLanguageKey("commands/images:reddit.link")}**: ${res.data.url}`
        ];
        return message.channel.send(completeResponse.join("\n"));
    }
}
