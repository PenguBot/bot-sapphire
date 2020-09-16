"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const decorators_1 = require("@sapphire/decorators");
let PenguCommand = class PenguCommand extends framework_1.Command {
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
            .setFooter("PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(randomImage);
        return message.channel.send(await message.fetchLanguageKey("commands/images:punch.response", { from: `${message.author}`, to: `${mentioned}` }), { embed });
    }
};
PenguCommand = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        description: "commands/images:punch.description",
        detailedDescription: "commands/images:punch.detailedDescription",
        preconditions: ["Permissions"]
    })
], PenguCommand);
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=punch.js.map