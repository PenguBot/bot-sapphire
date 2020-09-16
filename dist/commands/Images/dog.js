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
        const body = await util_1.fetch("https://dog.ceo/api/breeds/image/random");
        if (body.status !== "success")
            return message.sendTranslated("basicError");
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setFooter(`PenguBot.com - ${await message.fetchLanguageKey("poweredBy")} dog.ceo`)
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(body.message));
    }
};
PenguCommand = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        description: "commands/images:dog.description",
        detailedDescription: "noDetailedDescription",
        preconditions: ["Permissions"]
    })
], PenguCommand);
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=dog.js.map