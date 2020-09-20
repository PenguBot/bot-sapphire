import { GuildEconomyEntity } from "@orm/entities/GuildEconomyEntity";
import { GuildEntity } from "@orm/entities/GuildEntity";
import { EntityRepository, FindOneOptions, Repository } from "typeorm";

@EntityRepository(GuildEntity)
export class GuildRepository extends Repository<GuildEntity> {
    public async ensure(id: string, options?: FindOneOptions<GuildEntity>) {
		const previous = await this.findOne(id, options);
		if (previous) return previous;

		const data = new GuildEntity();
		data.id = id;
		return data;
    }

    public async ensureEconomy(id: string, options: FindOneOptions<GuildEntity> = {}) {
		const guild = await this.ensure(id, { ...options, relations: ["economy"] });
		if (!guild.economy) {
			guild.economy = new GuildEconomyEntity();
			guild.economy.guild = guild;
		}

		return guild as GuildEntity & { economy: NonNullable<GuildEntity["economy"]> };
	}
}
