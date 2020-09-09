import { Command, Args } from "@sapphire/framework";
import { Message, MessageEmbed, User } from "discord.js";
import { fetch } from "@utils/util";
import { API_KEYS } from "@root/config";
import moment from "moment";
import { DbSet } from "@lib/structures/DbSet";

export class PenguCommand extends Command {

    public async run(message: Message, args: Args) {
        let username: string|undefined|null = await args.pick("string").catch(() => null);
        if (!username) username = await this.fetchGametag(message.author);
        if (!username) return message.sendTranslated("commands/gamestats:noGamerTag");

        const res: OSUResponseData[] = await fetch(`https://osu.ppy.sh/api/get_user?k=${API_KEYS.OSU}&u=${encodeURIComponent(username as string)}`);
        if (!res || !res[0]) return message.sendTranslated("commands/gamestats:notFound");

        // @todo save flag to save username

        const data = res[0];
        return message.channel.send(new MessageEmbed()
            .setFooter(`PenguBot.com - ${await message.fetchLanguageKey("poweredBy")} osu.ppy.sh`)
            .setTimestamp()
            .setThumbnail(`https://a.ppy.sh/${data.user_id}`)
            .setColor("#EF5E9F")
            .setAuthor(data.username, "https://i.imgur.com/IVtH5vo.png", "https://pengubot.com")
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.totalScore"), Number(data.total_score).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.rankedScore"), Number(data.ranked_score).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.level"), Number(data.level).toFixed(0).toLocaleString(), true)
            .addField(`${await message.fetchLanguageKey("commands/gamestats:osu.count")} 50`, Number(data.count50).toLocaleString(), true)
            .addField(`${await message.fetchLanguageKey("commands/gamestats:osu.count")} 100`, Number(data.count100).toLocaleString(), true)
            .addField(`${await message.fetchLanguageKey("commands/gamestats:osu.count")} 300`, Number(data.count300).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.globalRank"), Number(data.pp_rank).toLocaleString(), true)
            .addField(`SS ${await message.fetchLanguageKey("commands/gamestats:osu.rank")}`, Number(data.count_rank_ss).toLocaleString(), true)
            .addField(`SSH ${await message.fetchLanguageKey("commands/gamestats:osu.rank")}`, Number(data.count_rank_ssh).toLocaleString(), true)
            .addField(`S ${await message.fetchLanguageKey("commands/gamestats:osu.rank")}`, Number(data.count_rank_s).toLocaleString(), true)
            .addField(`A ${await message.fetchLanguageKey("commands/gamestats:osu.rank")}`, Number(data.count_rank_a).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.accuracy"), `${Number(data.accuracy).toFixed(2)}%`, true)
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.timePlayed"), `${moment.duration(Number(data.total_seconds_played), "seconds").asHours().toLocaleString()} ${await message.fetchLanguageKey("commands/gamestats:osu.hours")}`, true));
    }

    public async fetchGametag(author: User) {
        const { users } = await DbSet.connect();
        const gametagData = await users.fetchGametag<OSUGametagData>(this.name, author);

        return gametagData.data?.username;
    }

}

interface OSUResponseData {
    user_id: string;
    username: string;
    join_date: string;
    count300: string;
    count100: string;
    count50: string;
    playcount: string;
    ranked_score: string;
    total_score: string;
    pp_rank: string;
    level: string;
    pp_raw: string;
    accuracy: string;
    count_rank_ss: string;
    count_rank_ssh: string;
    count_rank_s: string;
    count_rank_sh: string;
    count_rank_a: string;
    country: string;
    total_seconds_played: string;
    pp_country_rank: string;
    events: OSUEvent[];
}

interface OSUEvent {
    display_html: string;
    beatmap_id: string;
    beatmapset_id: string;
    data: string;
    epicfactor: string;
}

interface OSUGametagData {
    username?: string;
}
