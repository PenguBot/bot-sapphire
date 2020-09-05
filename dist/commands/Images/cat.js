"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const util_1 = require("@utils/util");
class PenguCommand extends framework_1.Command {
    async run(message) {
        const { fact } = await util_1.fetch("https://catfact.ninja/fact");
        if (!fact)
            return message.sendTranslated("basicError");
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setFooter("© PenguBot.com - Powered by catfact.ninja")
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`**${(await message.fetchLanguageKey("commands/images:catTitle"))}**\n${fact}`)
            .setImage(`http://thecatapi.com/api/images/get?format=src&type=jpg&size=med&${Date.now()}`));
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=cat.js.map