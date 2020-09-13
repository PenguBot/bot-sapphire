"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const util_1 = require("@utils/util");
const config_1 = require("@root/config");
const moment_1 = tslib_1.__importDefault(require("moment"));
const DbSet_1 = require("@lib/structures/DbSet");
class PenguCommand extends framework_1.Command {
    async run(message, args) {
        let username = await args.pick("string").catch(() => null);
        if (!username)
            username = await this.fetchGametag(message.author);
        if (!username)
            return message.sendTranslated("commands/gaming:noGamerTag");
        const res = await util_1.fetch(`https://osu.ppy.sh/api/get_user?k=${config_1.API_KEYS.OSU}&u=${encodeURIComponent(username)}`);
        if (!res || !res[0])
            return message.sendTranslated("commands/gaming:notFound");
        const data = res[0];
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setFooter(`PenguBot.com - ${await message.fetchLanguageKey("poweredBy")} osu.ppy.sh`)
            .setTimestamp()
            .setThumbnail(`https://a.ppy.sh/${data.user_id}`)
            .setColor("#EF5E9F")
            .setAuthor(data.username, "https://i.imgur.com/IVtH5vo.png", "https://pengubot.com")
            .addField(await message.fetchLanguageKey("commands/gaming:osu.totalScore"), Number(data.total_score).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:osu.rankedScore"), Number(data.ranked_score).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:osu.level"), Number(data.level).toFixed(0).toLocaleString(), true)
            .addField(`${await message.fetchLanguageKey("commands/gaming:osu.count")} 50`, Number(data.count50).toLocaleString(), true)
            .addField(`${await message.fetchLanguageKey("commands/gaming:osu.count")} 100`, Number(data.count100).toLocaleString(), true)
            .addField(`${await message.fetchLanguageKey("commands/gaming:osu.count")} 300`, Number(data.count300).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:osu.globalRank"), Number(data.pp_rank).toLocaleString(), true)
            .addField(`SS ${await message.fetchLanguageKey("commands/gaming:osu.rank")}`, Number(data.count_rank_ss).toLocaleString(), true)
            .addField(`SSH ${await message.fetchLanguageKey("commands/gaming:osu.rank")}`, Number(data.count_rank_ssh).toLocaleString(), true)
            .addField(`S ${await message.fetchLanguageKey("commands/gaming:osu.rank")}`, Number(data.count_rank_s).toLocaleString(), true)
            .addField(`A ${await message.fetchLanguageKey("commands/gaming:osu.rank")}`, Number(data.count_rank_a).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:osu.accuracy"), `${Number(data.accuracy).toFixed(2)}%`, true)
            .addField(await message.fetchLanguageKey("commands/gaming:osu.timePlayed"), `${moment_1.default.duration(Number(data.total_seconds_played), "seconds").asHours().toLocaleString()} ${await message.fetchLanguageKey("commands/gaming:osu.hours")}`, true));
    }
    async fetchGametag(author) {
        const { users } = await DbSet_1.DbSet.connect();
        const gametagData = await users.fetchGametag(this.name, author);
        return gametagData.data?.username;
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=osu.js.map