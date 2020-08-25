/* eslint-disable @typescript-eslint/naming-convention */
import { DbSet } from "@lib/structures/DbSet";
import { MessageOptions, Structures } from "discord.js";

Structures.extend("Message", Message => {
    class PenguMessage extends Message {

        public async sendLocale(key: string, args?: Record<string, unknown>, options?: MessageOptions) {
            return this.channel.send(await this.fetchLocaledString(key, args), options);
        }

        public async fetchLocaledString(key: string, args?: Record<string, unknown>) {
            const languageCode = await this.fetchLanguage();
            const language = this.client.languages.languages.get(languageCode);

            if (!language) throw new Error("Invalid language set in settings.");

            return language(key, args);
        }

        public async fetchLanguage() {
            if (this.guild) {
                const { guilds } = await DbSet.connect();
                const { language } = await guilds.ensure(this.guild.id);
                return language;
            }
            return "en-US";
        }
    }

    return PenguMessage;
});

declare module "discord.js" {
    interface Message {
        sendLocale(key: string, args?: Record<string, unknown>, options?: MessageOptions): Promise<Message>;
        fetchLocaledString(key: string, args?: Record<string, unknown>): Promise<string>;
        fetchLanguage(): Promise<string>;
    }
}
