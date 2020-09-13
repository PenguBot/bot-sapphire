"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const util_1 = require("@utils/util");
const config_1 = require("@root/config");
const DbSet_1 = require("@lib/structures/DbSet");
const moment_1 = tslib_1.__importDefault(require("moment"));
class PenguCommand extends framework_1.Command {
    async run(message, args) {
        let username = await args.pick("string").catch(() => null);
        if (!username)
            username = await this.fetchGametag(message.author);
        if (!username)
            return message.sendTranslated("commands/gaming:noGamerTag");
        const res = await util_1.fetch(`https://fortniteapi.io/v1/lookup?username=${username}`, { headers: { Authorization: config_1.API_KEYS.FORTNITE } });
        if (!res.result)
            return message.sendTranslated("commands/gaming:notFound");
        const stats = await util_1.fetch(`https://fortniteapi.io/v1/stats?account=${res.account_id}`, { headers: { Authorization: config_1.API_KEYS.FORTNITE } });
        if (!stats.result || !stats.global_stats)
            return message.sendTranslated("commands/gaming:statsNotFound");
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setFooter(`PenguBot.com`)
            .setTimestamp()
            .setThumbnail("https://i.imgur.com/FD0xslx.png")
            .setColor("#63CBF0")
            .setAuthor(stats.name, "https://i.imgur.com/FD0xslx.png", "https://pengubot.com")
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.winRate"), ((stats.global_stats.duo.winrate + stats.global_stats.solo.winrate + stats.global_stats.squad.winrate) / 3).toPrecision(2), true)
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.level"), stats.account.level, true)
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.progress"), `${stats.account.progress_pct}%`, true)
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.kills"), (stats.global_stats.duo.kills + stats.global_stats.solo.kills + stats.global_stats.squad.kills).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.kdr"), ((stats.global_stats.duo.kd + stats.global_stats.solo.kd + stats.global_stats.squad.kd) / 3).toPrecision(2), true)
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.matchesPlayed"), (stats.global_stats.duo.matchesplayed + stats.global_stats.solo.matchesplayed + stats.global_stats.squad.matchesplayed).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.timePlayed"), `${moment_1.default.duration((stats.global_stats.duo.minutesplayed + stats.global_stats.solo.minutesplayed + stats.global_stats.squad.minutesplayed), "minutes").asHours().toLocaleString()} ${await message.fetchLanguageKey("commands/gaming:fortnite.hours")}`, true)
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.wins"), (stats.global_stats.duo.placetop1 + stats.global_stats.solo.placetop1 + stats.global_stats.squad.placetop1).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.score"), (stats.global_stats.duo.score + stats.global_stats.solo.score + stats.global_stats.squad.score).toLocaleString(), true));
    }
    async fetchGametag(author) {
        const { users } = await DbSet_1.DbSet.connect();
        const gametagData = await users.fetchGametag(this.name, author);
        return gametagData.data?.username;
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=fortnite.js.map