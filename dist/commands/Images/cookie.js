"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const decorators_1 = require("@sapphire/decorators");
let PenguCommand = class PenguCommand extends framework_1.Command {
    images = [
        "http://i.imgur.com/SLwEY66.gif", "http://i.imgur.com/K6VoNp3.gif", "http://i.imgur.com/knVM6Lb.gif",
        "http://i.imgur.com/P1BMly5.gif", "http://i.imgur.com/I8CrTUT.gif", "https://i.imgur.com/0XTueQR.png",
        "https://i.imgur.com/u9k8x4J.png", "https://i.imgur.com/AUtfHnK.png", "https://i.imgur.com/XjTbrKc.png",
        "https://i.imgur.com/A3mgqEh.png", "https://i.imgur.com/YnkdGZd.png", "https://i.imgur.com/FJsOnOE.png",
        "https://i.imgur.com/RQFPwDg.png", "https://i.imgur.com/vyCTGr0.png", "https://i.imgur.com/kkXToc8.png",
        "https://i.imgur.com/ctHwqVL.png", "https://i.imgur.com/yUaCPvC.png", "https://i.imgur.com/IUM6Z8F.png"
    ];
    async run(message, args) {
        const mentioned = await args.pick("user");
        const randomImage = this.images[Math.floor(Math.random() * this.images.length)];
        const embed = new discord_js_1.MessageEmbed()
            .setFooter("PenguBot.com")
            .setTimestamp()
            .setColor("RANDOM")
            .setImage(randomImage);
        return message.channel.send(await message.fetchLanguageKey("commands/images:cookie.response", { from: `${message.author}`, to: `${mentioned}` }), { embed });
    }
};
PenguCommand = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        description: "commands/images:cookie.description",
        detailedDescription: "commands/images:cookie.detailedDescription",
        preconditions: ["Permissions"]
    })
], PenguCommand);
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=cookie.js.map