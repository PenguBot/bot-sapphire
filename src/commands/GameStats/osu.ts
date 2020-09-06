import { Command, Args } from "@sapphire/framework";
import { Message, MessageEmbed } from "discord.js";
import { fetch } from "@utils/util";
import { API_KEYS } from "@root/config";
import moment from "moment";
import { DbSet } from "@lib/structures/DbSet";

export class PenguCommand extends Command {

    public async run(message: Message, args: Args) {
        const username = args.pick("string") ? args.pick("string") : await this.getGameTag(message.author.id);
        if (!username) return message.sendTranslated("commands/gamestats:osu.noGamerTag");

        const res: OSUResponseData[] = await fetch(`https://osu.ppy.sh/api/get_user?k=${API_KEYS.OSU}&u=${encodeURIComponent(await username)}`);
        if (!res || !res[0]) return message.sendTranslated("commands/gamestats:osu.notFound");

        const data = res[0];
        return message.channel.send(new MessageEmbed()
            .setFooter(`© PenguBot.com - ${await message.fetchLanguageKey("poweredBy")} osu.ppy.sh`)
            .setTimestamp()
            .setThumbnail(`https://a.ppy.sh/${data.user_id}`)
            .setColor("#EF5E9F")
            .setAuthor(data.username, "https://i.imgur.com/IVtH5vo.png", "https://pengubot.com")
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.embed.totalScore"), Number(data.total_score).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.embed.rankedScore"), Number(data.ranked_score).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.embed.level"), Number(data.level).toFixed(0).toLocaleString(), true)
            .addField(`${await message.fetchLanguageKey("commands/gamestats:osu.embed.count")} 50`, Number(data.count50).toLocaleString(), true)
            .addField(`${await message.fetchLanguageKey("commands/gamestats:osu.embed.count")} 100`, Number(data.count100).toLocaleString(), true)
            .addField(`${await message.fetchLanguageKey("commands/gamestats:osu.embed.count")} 300`, Number(data.count300).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.embed.globalRank"), Number(data.pp_rank).toLocaleString(), true)
            .addField(`SS ${await message.fetchLanguageKey("commands/gamestats:osu.embed.rank")}`, Number(data.count_rank_ss).toLocaleString(), true)
            .addField(`SSH ${await message.fetchLanguageKey("commands/gamestats:osu.embed.rank")}`, Number(data.count_rank_ssh).toLocaleString(), true)
            .addField(`S ${await message.fetchLanguageKey("commands/gamestats:osu.embed.rank")}`, Number(data.count_rank_s).toLocaleString(), true)
            .addField(`A ${await message.fetchLanguageKey("commands/gamestats:osu.embed.rank")}`, Number(data.count_rank_a).toLocaleString(), true)
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.embed.accuracy"), `${Number(data.accuracy).toFixed(2)}%`, true)
            .addField(await message.fetchLanguageKey("commands/gamestats:osu.embed.timePlayed"), moment.duration(Number(data.total_seconds_played), "seconds").humanize(), true));
    }

    public async getGameTag(id: string) {
        const { users } = await DbSet.connect();
        const settings = await users.ensure(id);

        return settings.gametag_osu;
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
