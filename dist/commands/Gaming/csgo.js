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
        const res = await util_1.fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${config_1.API_KEYS.CSGO}&vanityurl=${username}`);
        if (!res || !res.response.success)
            return message.sendTranslated("commands/gaming:notFound");
        const data = await util_1.fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?key=${config_1.API_KEYS.CSGO}&steamid=${res.response.steamid}&appid=730`);
        if (!data || !data.playerstats)
            return message.sendTranslated("commands/gaming:statsNotFound");
        return message.channel.send(new discord_js_1.MessageEmbed()
            .setFooter(`PenguBot.com`)
            .setTimestamp()
            .setThumbnail("https://i.imgur.com/YsSDLu6.png")
            .setColor("#FB9E01")
            .setAuthor(username, "https://i.imgur.com/ttIw76k.png", "https://pengubot.com")
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.kdr"), (data.playerstats ? data.playerstats.stats.find(a => a.name === "total_kills").value / data.playerstats.stats.find(a => a.name === "total_deaths").value : 0).toFixed(2), true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.kills"), data.playerstats.stats.find(a => a.name === "total_kills") ? data.playerstats.stats.find(a => a.name === "total_kills").value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.deaths"), data.playerstats.stats.find(a => a.name === "total_deaths") ? data.playerstats.stats.find(a => a.name === "total_deaths").value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.wins"), data.playerstats.stats.find(a => a.name === "total_wins") ? data.playerstats.stats.find(a => a.name === "total_wins").value.toLocaleString() : 0, true)
            .addField(`MVPs`, data.playerstats.stats.find(a => a.name === "total_mvps") ? data.playerstats.stats.find(a => a.name === "total_mvps").value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.knifeKills"), data.playerstats.stats.find(a => a.name === "total_kills_knife") ? data.playerstats.stats.find(a => a.name === "total_kills_knife").value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.bombsPlanted"), data.playerstats.stats.find(a => a.name === "total_planted_bombs") ? data.playerstats.stats.find(a => a.name === "total_planted_bombs").value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.lastMatchKills"), data.playerstats.stats.find(a => a.name === "last_match_kills") ? data.playerstats.stats.find(a => a.name === "last_match_kills").value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.timePlayed"), `${moment_1.default.duration(data.playerstats.stats.find(a => a.name === "total_time_played") ? data.playerstats.stats.find(a => a.name === "total_time_played").value.toLocaleString() : 0, "seconds").asHours()} ${await message.fetchLanguageKey("commands/gaming:csgo.hours")}`, true));
    }
    async fetchGametag(author) {
        const { users } = await DbSet_1.DbSet.connect();
        const gametagData = await users.fetchGametag(this.name, author);
        return gametagData.data?.username;
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=csgo.js.map