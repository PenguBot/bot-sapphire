"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const util_1 = require("@utils/util");
class PenguCommand extends framework_1.Command {
    async run(message) {
        const body = await util_1.fetch("https://dog.ceo/api/breeds/image/random");
        if (body.status !== "success")
            return message.sendTranslated("basicError");
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setFooter("© PenguBot.com - Powered by dog.ceo")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(body.message));
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=dog.js.map