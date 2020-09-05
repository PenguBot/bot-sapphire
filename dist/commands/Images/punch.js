"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
class PenguCommand extends framework_1.Command {
    images = [
        "http://i.imgur.com/aGPHQ3E.gif", "http://i.imgur.com/FxFfdOZ.gif", "http://i.imgur.com/XA7PPiy.gif",
        "http://i.imgur.com/5hcVtGf.gif", "http://i.imgur.com/nwGsg12.gif", "http://i.imgur.com/GZX1COH.gif",
        "https://i.imgur.com/UcycckQ.gif", "https://i.imgur.com/VmdBxgq.gif", "https://i.imgur.com/IputsOi.gif",
        "https://i.imgur.com/UY3sTpj.gif", "https://i.imgur.com/VdwTwRo.gif", "https://i.imgur.com/VIKEo7q.gif",
        "https://i.imgur.com/XPq1P4F.gif", "https://i.imgur.com/X0uIstL.gif", "https://i.imgur.com/Of2BTLu.gif",
        "https://i.imgur.com/tSjlgKs.gif", "https://i.imgur.com/hEDcADi.gif"
    ];
    async run(message, args) {
        const mentioned = await args.pick("user");
        const randomImage = this.images[Math.floor(Math.random() * this.images.length)];
        const embed = new discord_js_1.MessageEmbed()
            .setFooter("© PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(randomImage);
        return message.channel.send(await message.fetchLanguageKey("commands/images:punch", { from: `${message.author}`, to: `${mentioned}` }), { embed });
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=punch.js.map