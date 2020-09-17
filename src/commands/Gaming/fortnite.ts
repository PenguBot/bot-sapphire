import { Command, Args, CommandOptions } from "@sapphire/framework";
import { Message, MessageEmbed, User } from "discord.js";
import { fetch } from "@utils/util";
import { API_KEYS } from "@root/config";
import { DbSet } from "@lib/structures/DbSet";
import moment from "moment";
import { ApplyOptions } from "@sapphire/decorators";
import { PreConditions } from "@lib/types/Types";

@ApplyOptions<CommandOptions>({
    description: "commands/gaming:fortnite.description",
    detailedDescription: "commands/gaming:fortnite.detailedDescription",
    preconditions: [PreConditions.Permissions],
    strategyOptions: { flags: ["save"] }
})
export class PenguCommand extends Command {

    public async run(message: Message, args: Args) {
        let username: string|undefined|null = await args.pick("string").catch(() => null);
        if (!username) username = await this.fetchGametag(message.author);
        if (!username) return message.sendTranslated("commands/gaming:noGamerTag");

        const res: FortnitePlayerSearchData = await fetch(`https://fortniteapi.io/v1/lookup?username=${username}`, { headers: { Authorization: API_KEYS.FORTNITE } });
        if (!res.result) return message.sendTranslated("commands/gaming:notFound");

        const stats: FortnitePlayerStats = await fetch(`https://fortniteapi.io/v1/stats?account=${res.account_id}`, { headers: { Authorization: API_KEYS.FORTNITE } });
        if (!stats.result || !stats.global_stats) return message.sendTranslated("commands/gaming:statsNotFound");

        const saveFlag = args.getFlags("save");
        if (saveFlag) await this.saveGametag(username, message.author).catch(e => message.sendTranslated("commands/gaming:tagSaveError", [{ error: e }]));

        return message.channel.send(new MessageEmbed()
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
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.timePlayed"), `${moment.duration((stats.global_stats.duo.minutesplayed + stats.global_stats.solo.minutesplayed + stats.global_stats.squad.minutesplayed), "minutes").asHours().toLocaleString()} ${await message.fetchLanguageKey("commands/gaming:fortnite.hours")}`, true)
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.wins"), (stats.global_stats.duo.placetop1 + stats.global_stats.solo.placetop1 + stats.global_stats.squad.placetop1).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gaming:fortnite.score"), (stats.global_stats.duo.score + stats.global_stats.solo.score + stats.global_stats.squad.score).toLocaleString(), true));
    }

    public async fetchGametag(author: User) {
        const { users } = await DbSet.connect();
        const gametagData = await users.fetchGametag<FortniteGametagData>(this.name, author);

        return gametagData.data?.tag;
    }

    public async saveGametag(tag: string, author: User) {
        const { users } = await DbSet.connect();
        const gametagData = await users.fetchGametag<FortniteGametagData>(this.name, author);

        gametagData.data = { ...gametagData.data, tag };
        return gametagData.save();
    }

}

interface FortniteGametagData {
    tag?: string;
}

interface FortnitePlayerSearchData {
    result: boolean;
    account_id: string;
}

interface FortnitePlayerStats {
    result: boolean;
    source: string;
    mode: string;
    name: string;
    account: {
        level?: number;
        progress_pct?: number;
    };
    global_stats?: {
        solo: {
            placetop1: number;
            kd: number;
            winrate: number;
            placetop3: number;
            placetop5: number;
            placetop6: number;
            placetop10: number;
            placetop12: number;
            placetop25: number;
            kills: number;
            matchesplayed: number;
            minutesplayed: number;
            score: number;
            playersoutlived: number;
        };
        duo: {
            placetop1: number;
            kd: number;
            winrate: number;
            placetop3: number;
            placetop5: number;
            placetop6: number;
            placetop10: number;
            placetop12: number;
            placetop25: number;
            kills: number;
            matchesplayed: number;
            minutesplayed: number;
            score: number;
            playersoutlived: number;
        };
        squad: {
            placetop1: number;
            kd: number;
            winrate: number;
            placetop3: number;
            placetop5: number;
            placetop6: number;
            placetop10: number;
            placetop12: number;
            placetop25: number;
            kills: number;
            matchesplayed: number;
            minutesplayed: number;
            score: number;
            playersoutlived: number;
        };
    }
}
