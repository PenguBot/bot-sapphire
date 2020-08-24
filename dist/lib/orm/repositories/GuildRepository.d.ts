import { GuildEntity } from "@orm/entities/GuildEntity";
import { FindOneOptions, Repository } from "typeorm";
export declare class GuildRepository extends Repository<GuildEntity> {
    ensure(id: string, options?: FindOneOptions<GuildEntity>): Promise<GuildEntity>;
}
