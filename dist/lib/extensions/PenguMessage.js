"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
discord_js_1.Structures.extend("Message", Message => {
    class PenguMessage extends Message {
        send(content, options) {
            return this.channel.send(content, options);
        }
        async sendLocale(key, args, options) {
            const content = await this.translate(key, args);
            return this.send(content, options);
        }
        async translate(key, args) {
            const languageCode = this.guild ? await this.client.cache.getLanguage(this.guild.id) : "en-US";
            const language = this.client.languages.languages.get(languageCode);
            if (!language)
                throw new Error("Invalid language set in settings.");
            return language(key, { defaultValue: language("default:DEFAULT", { fallbackLng: "en-US", replace: { key } }), replace: args });
        }
    }
    return PenguMessage;
});
//# sourceMappingURL=PenguMessage.js.map