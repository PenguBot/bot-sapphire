"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const util_1 = require("@utils/util");
const decorators_1 = require("@sapphire/decorators");
let PenguCommand = class PenguCommand extends framework_1.Command {
    async run(message, args) {
        const mentioned = await args.pick("user");
        const { url } = await util_1.fetch("https://nekos.life/api/v2/img/kiss");
        if (!url)
            return message.sendTranslated("basicError");
        const embed = new discord_js_1.MessageEmbed()
            .setFooter("PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(url);
        return message.channel.send(await message.fetchLanguageKey("commands/images:kiss.response", { from: `${message.author}`, to: `${mentioned}` }), { embed });
    }
};
PenguCommand = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        description: "commands/images:kiss.description",
        detailedDescription: "commands/images:kiss.detailedDescription",
        preconditions: ["Permissions"]
    })
], PenguCommand);
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=kiss.js.map