"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const framework_1 = require("@sapphire/framework");
const util_1 = require("@utils/util");
class PenguCommand extends framework_1.Command {
    subReddits = ["AdviceAnimals", "MemeEconomy", "ComedyCemetery", "memes", "dankmemes", "PrequelMemes", "terriblefacebookmemes", "PewdiepieSubmissions", "funny", "wholesomememes", "fffffffuuuuuuuuuuuu", "BikiniBottomTwitter", "2meirl4meirl", "DeepFriedMemes", "surrealmemes", "firstworldanarchists"];
    async run(message) {
        const res = await util_1.randomSubredditItem(this.subReddits[Math.floor(Math.random() * this.subReddits.length)], "hot");
        if (!res || !res.data)
            return message.sendTranslated("basicError");
        if (res.data.over_18 && !message.channel.nsfw)
            return message.sendTranslated("commands/images:reddit.nsfwPost");
        const completeResponse = [
            `**${await message.fetchLanguageKey("commands/images:reddit.title")}**: ${res.data.title}`,
            `**${await message.fetchLanguageKey("commands/images:reddit.link")}**: ${res.data.url}`
        ];
        return message.channel.send(completeResponse.join("\n"));
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=meme.js.map