"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const util_1 = require("@utils/util");
class PenguCommand extends framework_1.Command {
    async run(message) {
        const body = await util_1.fetch("https://randomfox.ca/floof/");
        if (!body.image)
            return message.sendTranslated("basicError");
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setFooter("© PenguBot.com - Powered by randomfox.ca")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(body.image));
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=fox.js.map