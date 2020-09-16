"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const util_1 = require("@utils/util");
const decorators_1 = require("@sapphire/decorators");
let PenguCommand = class PenguCommand extends framework_1.Command {
    async run(message) {
        const { fact } = await util_1.fetch("https://catfact.ninja/fact");
        if (!fact)
            return message.sendTranslated("basicError");
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setFooter(`PenguBot.com - ${await message.fetchLanguageKey("poweredBy")} catfact.ninja`)
            .setTimestamp()
            .setColor("RANDOM")
            .setDescription(`**${(await message.fetchLanguageKey("commands/images:cat.embedTitle"))}**\n${fact}`)
            .setImage(`http://thecatapi.com/api/images/get?format=src&type=jpg&size=med&${Date.now()}`));
    }
};
PenguCommand = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        description: "commands/images:cat.description",
        detailedDescription: "noDetailedDescription",
        aliases: ["catfact"],
        preconditions: ["Permissions"]
    })
], PenguCommand);
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=cat.js.map