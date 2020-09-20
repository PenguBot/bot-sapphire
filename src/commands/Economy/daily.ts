/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DbSet } from "@lib/structures/DbSet";
import { PenguEconomyCommand } from "@lib/structures/PenguEconomyCommand";
import { ClientEconomyEntity } from "@orm/entities/ClientEconomyEntity";
import { GuildEconomyEntity } from "@orm/entities/GuildEconomyEntity";
import { UserEconomyEntity } from "@orm/entities/UserEconomyEntity";
import { UserEntity } from "@orm/entities/UserEntity";
import { Time } from "@utils/constants";
import type { Message } from "discord.js";

const DAILY_PERIOD = Time.Hour * 12;

// TODO: Actually make this a proper command
// TODO: Make usable only in guilds
export class PenguCommand extends PenguEconomyCommand {

    public async run(message: Message) {
        const now = Date.now();
        const conn = await DbSet.connect();

        return conn.users.lock([message.author.id], async id => {
            const settings = await conn.users.ensureCooldownsAndEconomy(id);

            if (!settings.cooldowns.daily || settings.cooldowns.daily.getTime() <= now) {
				await this.claimDailies(message, conn, settings, now + DAILY_PERIOD);
			}
        });
    }

    private async claimDailies(message: Message, connection: DbSet, settings: UserEntity, nextTime: number) {
        const money = 200;
        const taxRemoval = this.calculateTaxes(
                money,
                (await connection.clients.ensureEconomy()).economy,
                (await connection.guilds.ensureEconomy(message.guild!.id)).economy,
                settings.economy!
            );

        const moneyAfterTax = money - taxRemoval;
        await this.tax.tax(BigInt(taxRemoval));
        settings.economy!.balance += moneyAfterTax;
        settings.cooldowns!.daily = new Date(nextTime);
        await settings.save();

        return {
            money,
            taxRemoval,
            moneyAfterTax
        };
    }

    private calculateTaxes(dailyAmount: number, client: ClientEconomyEntity, guild: GuildEconomyEntity, user: UserEconomyEntity): number {
        const tax = Number(client.tGeneral) + Number(guild.toGeneral) + Number(user.toGeneral);
        return dailyAmount * tax;
    }

}
