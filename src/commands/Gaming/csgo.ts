/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Command, Args, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed, User } from "discord.js";
import { fetch } from "@utils/util";
import { API_KEYS } from "@root/config";
import { DbSet } from "@lib/structures/DbSet";
import moment from "moment";
import { ApplyOptions } from "@sapphire/decorators";
import { PreConditions } from "@lib/types/Types";

@ApplyOptions<CommandOptions>({
    description: "commands/gaming:csgo.description",
    detailedDescription: "commands/gaming:csgo.detailedDescription",
    aliases: ["counterstrikestats"],
    preconditions: [PreConditions.Permissions]
})
export class PenguCommand extends Command {

    public async run(message: Message, args: Args) {
        let username: string|undefined|null = await args.pick("string").catch(() => null);
        if (!username) username = await this.fetchGametag(message.author);
        if (!username) return message.sendTranslated("commands/gaming:noGamerTag");

        const res: CSGOPlayerSearchData = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEYS.CSGO}&vanityurl=${username}`);
        if (!res || !res.response.success) return message.sendTranslated("commands/gaming:notFound");

        const data: CSGOPlayerStats = await fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?key=${API_KEYS.CSGO}&steamid=${res.response.steamid}&appid=730`);
        if (!data || !data.playerstats) return message.sendTranslated("commands/gaming:statsNotFound");

        // @todo save flag to save account id

        return message.channel.send(new MessageEmbed()
            .setFooter(`PenguBot.com`)
            .setTimestamp()
            .setThumbnail("https://i.imgur.com/YsSDLu6.png")
            .setColor("#FB9E01")
            .setAuthor(username, "https://i.imgur.com/ttIw76k.png", "https://pengubot.com")
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.kdr"), (data.playerstats ? data.playerstats.stats.find(a => a.name === "total_kills")!.value / data.playerstats.stats.find(a => a.name === "total_deaths")!.value : 0).toFixed(2), true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.kills"), data.playerstats.stats.find(a => a.name === "total_kills") ? data.playerstats.stats.find(a => a.name === "total_kills")!.value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.deaths"), data.playerstats.stats.find(a => a.name === "total_deaths") ? data.playerstats.stats.find(a => a.name === "total_deaths")!.value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.wins"), data.playerstats.stats.find(a => a.name === "total_wins") ? data.playerstats.stats.find(a => a.name === "total_wins")!.value.toLocaleString() : 0, true)
            .addField(`MVPs`, data.playerstats.stats.find(a => a.name === "total_mvps") ? data.playerstats.stats.find(a => a.name === "total_mvps")!.value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.knifeKills"), data.playerstats.stats.find(a => a.name === "total_kills_knife") ? data.playerstats.stats.find(a => a.name === "total_kills_knife")!.value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.bombsPlanted"), data.playerstats.stats.find(a => a.name === "total_planted_bombs") ? data.playerstats.stats.find(a => a.name === "total_planted_bombs")!.value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.lastMatchKills"), data.playerstats.stats.find(a => a.name === "last_match_kills") ? data.playerstats.stats.find(a => a.name === "last_match_kills")!.value.toLocaleString() : 0, true)
            .addField(await message.fetchLanguageKey("commands/gaming:csgo.timePlayed"), `${moment.duration(data.playerstats.stats.find(a => a.name === "total_time_played") ? data.playerstats.stats.find(a => a.name === "total_time_played")!.value.toLocaleString() : 0, "seconds").asHours()} ${await message.fetchLanguageKey("commands/gaming:csgo.hours")}`, true));
    }

    public async fetchGametag(author: User) {
        const { users } = await DbSet.connect();
        const gametagData = await users.fetchGametag<CSGOGametagData>(this.name, author);

        return gametagData.data?.username;
    }

}

interface CSGOGametagData {
    username?: string;
}

interface CSGOPlayerSearchData {
    response: {
        success: 1|0;
        steamid: number;
    }
}

interface CSGOPlayerStats {
    playerstats: {
        steamID: string;
        gameName: string;
        stats: [
            {
                name: string;
                value: number;
            }
        ],
        achievements: [
            {
                name: string;
                achieved: 1|0;
            }
        ]
    }
}
