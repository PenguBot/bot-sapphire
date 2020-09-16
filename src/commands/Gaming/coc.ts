import { Command, Args, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed, User } from "discord.js";
import { fetch } from "@utils/util";
import { API_KEYS } from "@root/config";
import { DbSet } from "@lib/structures/DbSet";
import { toTitleCase } from "@sapphire/utilities";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<CommandOptions>({
    description: "commands/gaming:coc.description",
    detailedDescription: "commands/gaming:coc.detailedDescription",
    aliases: ["clashofclans"],
    preconditions: ["permissions"]
})
export class PenguCommand extends Command {

    public async run(message: Message, args: Args) {
        let username: string|undefined|null = await args.pick("string").catch(() => null);
        if (!username) username = await this.fetchGametag(message.author);
        if (!username) return message.sendTranslated("commands/gaming:noGamerTag");

        const res: ClashOfClansRes = await fetch(`https://api.clashofclans.com/v1/players/${encodeURIComponent(username.toUpperCase())}`, { headers: { Authorization: API_KEYS.COC } });
        if (!res) return message.sendTranslated("commands/gaming:notFound");

        // @todo save flag to save account tag

        const embed = new MessageEmbed()
            .setFooter(`PenguBot.com`)
            .setTimestamp()
            .setThumbnail(`https://coc.guide/static/imgs/other/town-hall-${res.townHallLevel}.png`)
            .setColor("#FCCF6E")
            .setAuthor(`${res.name} ${res.league ? `| ${res.league.name}` : ""}`, res.league ? res.league.iconUrls.small : "", "https://pengubot.com")
            .addField(await message.fetchLanguageKey("commands/gaming:coc.trophies"), res.trophies.toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:coc.warStars"), res.warStars.toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:coc.bestTrophies"), res.bestTrophies.toLocaleString(), true);

        if (res.clan) embed.setFooter(`PenguBot.com | ${toTitleCase(res.role)} - ${res.clan.name}\u200e ${res.clan.tag}`, res.clan.badgeUrls.small);

        let troopLevels = "";
        let spellLevels = "";
        let heroLevels = "";

        for (const troop of res.troops) troopLevels += `${troop.name}: ${troop.level} ${troop.level === troop.maxLevel ? "🔥\n" : "\n"}`;
        if (res.spells) for (const spell of res.spells) spellLevels += `${spell.name}: ${spell.level} ${spell.level === spell.maxLevel ? "🔥\n" : "\n"}`;
        if (res.heroes) for (const hero of res.heroes) heroLevels += `${hero.name}: ${hero.level} ${hero.level === hero.maxLevel ? "🔥\n" : "\n"}`;

        if (troopLevels) embed.addField(await message.fetchLanguageKey("commands/gaming:coc.troopLevels"), troopLevels, true);
        if (spellLevels) embed.addField(await message.fetchLanguageKey("commands/gaming:coc.spellLevels"), spellLevels, true);
        if (heroLevels) embed.addField(await message.fetchLanguageKey("commands/gaming:coc.heroLevels"), heroLevels, true);

        return message.channel.send({ embed });
    }

    public async fetchGametag(author: User) {
        const { users } = await DbSet.connect();
        const gametagData = await users.fetchGametag<ClashOfClansGametagData>(this.name, author);

        return gametagData.data?.tag;
    }

}

interface ClashOfClansGametagData {
    tag?: string;
}

interface ClashOfClansRes {
    clan?: {
        tag: string,
        clanLevel: number,
        name: string,
        badgeUrls: {
            small: string,
            large: string,
            medium: string
        }
    },
    league?: {
        name: string,
        id: number,
        iconUrls: {
            small: string,
            large: string,
            medium: string
        }
    },
    role: string,
    attackWins: number,
    defenseWins: number,
    townHallLevel: number,
    townHallWeaponLevel: number,
    versusBattleWins: number,
    legendStatistics: {
        legendTrophies: number,
        currentSeason: {
            trophies: number,
            id: string,
            rank: number
        },
        bestSeason: {
            trophies: number,
            id: string,
            rank: number
        },
        previousSeason: {
            trophies: number,
            id: string,
            rank: number
        },
        previousVersusSeason: {
            trophies: number,
            id: string,
            rank: number
        },
        bestVersusSeason: {
            trophies: number,
            id: string,
            rank: number
        }
    },
    troops: [
        {
            level: number,
            name: string,
            maxLevel: number,
            village: string
        }
    ],
    heroes?: [
        {
            level: number,
            name: string,
            maxLevel: number,
            village: string
        }
    ],
    spells?: [
        {
            level: number,
            name: string,
            maxLevel: number,
            village: string
        }
    ],
    labels?: [
        {
            name: string,
            id: number,
            iconUrls: {
                small: string,
                large: string,
                medium: string
            }
        }
    ],
    tag: string,
    name: string,
    expLevel: number,
    trophies: number,
    bestTrophies: number,
    donations: number,
    donationsReceived: number,
    builderHallLevel: number,
    versusTrophies: number,
    bestVersusTrophies: number,
    warStars: number,
    achievements: [
        {
            stars: number,
            value: number,
            name: string,
            target: number,
            info: string,
            completionInfo: string,
            village: string
        }
    ],
    versusBattleWinCount: number
}
