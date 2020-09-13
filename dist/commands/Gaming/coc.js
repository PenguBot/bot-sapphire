"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const util_1 = require("@utils/util");
const config_1 = require("@root/config");
const DbSet_1 = require("@lib/structures/DbSet");
const utilities_1 = require("@sapphire/utilities");
class PenguCommand extends framework_1.Command {
    async run(message, args) {
        let username = await args.pick("string").catch(() => null);
        if (!username)
            username = await this.fetchGametag(message.author);
        if (!username)
            return message.sendTranslated("commands/gaming:noGamerTag");
        const res = await util_1.fetch(`https://api.clashofclans.com/v1/players/${encodeURIComponent(username.toUpperCase())}`, { headers: { Authorization: config_1.API_KEYS.COC } });
        if (!res)
            return message.sendTranslated("commands/gaming:notFound");
        const embed = new discord_js_1.MessageEmbed()
            .setFooter(`PenguBot.com`)
            .setTimestamp()
            .setThumbnail(`https://coc.guide/static/imgs/other/town-hall-${res.townHallLevel}.png`)
            .setColor("#FCCF6E")
            .setAuthor(`${res.name} ${res.league ? `| ${res.league.name}` : ""}`, res.league ? res.league.iconUrls.small : "", "https://pengubot.com")
            .addField(await message.fetchLanguageKey("commands/gaming:coc.trophies"), res.trophies.toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:coc.warStars"), res.warStars.toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:coc.bestTrophies"), res.bestTrophies.toLocaleString(), true);
        if (res.clan)
            embed.setFooter(`PenguBot.com | ${utilities_1.toTitleCase(res.role)} - ${res.clan.name}\u200e ${res.clan.tag}`, res.clan.badgeUrls.small);
        let troopLevels = "";
        let spellLevels = "";
        let heroLevels = "";
        for (const troop of res.troops)
            troopLevels += `${troop.name}: ${troop.level} ${troop.level === troop.maxLevel ? "🔥\n" : "\n"}`;
        if (res.spells)
            for (const spell of res.spells)
                spellLevels += `${spell.name}: ${spell.level} ${spell.level === spell.maxLevel ? "🔥\n" : "\n"}`;
        if (res.heroes)
            for (const hero of res.heroes)
                heroLevels += `${hero.name}: ${hero.level} ${hero.level === hero.maxLevel ? "🔥\n" : "\n"}`;
        if (troopLevels)
            embed.addField(await message.fetchLanguageKey("commands/gaming:coc.troopLevels"), troopLevels, true);
        if (spellLevels)
            embed.addField(await message.fetchLanguageKey("commands/gaming:coc.spellLevels"), spellLevels, true);
        if (heroLevels)
            embed.addField(await message.fetchLanguageKey("commands/gaming:coc.heroLevels"), heroLevels, true);
        return message.channel.send({ embed });
    }
    async fetchGametag(author) {
        const { users } = await DbSet_1.DbSet.connect();
        const gametagData = await users.fetchGametag(this.name, author);
        return gametagData.data?.tag;
    }
}
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=coc.js.map