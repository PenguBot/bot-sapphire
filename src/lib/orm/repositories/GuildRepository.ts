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
}
