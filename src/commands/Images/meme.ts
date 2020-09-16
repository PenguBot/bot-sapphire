import { Command, CommandOptions } from "@sapphire/framework";
import { Message, TextChannel } from "discord.js";
import { randomSubredditItem } from "@utils/util";
import { ApplyOptions } from "@sapphire/decorators";
import { PreConditions } from "@lib/types/Types";

@ApplyOptions<CommandOptions>({
    description: "commands/images:meme.description",
    detailedDescription: "noDetailedDescription",
    preconditions: [PreConditions.Permissions]
})
export class PenguCommand extends Command {

    public subReddits = ["AdviceAnimals", "MemeEconomy", "ComedyCemetery", "memes", "dankmemes", "PrequelMemes", "terriblefacebookmemes", "PewdiepieSubmissions", "funny", "wholesomememes", "fffffffuuuuuuuuuuuu", "BikiniBottomTwitter", "2meirl4meirl", "DeepFriedMemes", "surrealmemes", "firstworldanarchists"];

    public async run(message: Message) {
        const res = await randomSubredditItem(this.subReddits[Math.floor(Math.random() * this.subReddits.length)], "hot");
        if (!res || !res.data) return message.sendTranslated("basicError");
        if (res.data.over_18 && !(message.channel as TextChannel).nsfw) return message.sendTranslated("commands/images:meme.nsfwPost");

        const completeResponse = [
            `**${await message.fetchLanguageKey("commands/images:meme.title")}**: ${res.data.title}`,
            `**${await message.fetchLanguageKey("commands/images:meme.link")}**: ${res.data.url}`
        ];
        return message.channel.send(completeResponse.join("\n"));
    }
}
