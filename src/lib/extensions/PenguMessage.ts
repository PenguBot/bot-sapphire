/* eslint-disable @typescript-eslint/naming-convention */
import { MessageOptions, Structures } from "discord.js";

Structures.extend("Message", Message => {
    class PenguMessage extends Message {

        public async sendLocale(key: string, args?: Record<string, unknown>, options?: MessageOptions) {
            const content = await this.translate(key, args);
            return this.channel.send(content, options);
        }

        public async translate(key: string, args?: Record<string, unknown>) {
            const languageCode = this.guild ? await this.client.cache.getLanguage(this.guild.id) : "en-US";
            const language = this.client.languages.languages.get(languageCode);

            if (!language) throw new Error("Invalid language set in settings.");

            return language(key, { defaultValue: language("default:DEFAULT", { fallbackLng: "en-US", replace: { key } }), replace: args });
        }
    }

    return PenguMessage;
});

declare module "discord.js" {
    interface Message {
        sendLocale(key: string, args?: Record<string, unknown>, options?: MessageOptions): Promise<Message>;
        translate(key: string, args?: Record<string, unknown>): Promise<string>;
    }
}
