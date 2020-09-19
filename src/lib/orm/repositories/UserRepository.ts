import { DbSet } from "@lib/structures/DbSet";
import { UserEconomyEntity } from "@orm/entities/UserEconomyEntity";
import { UserEntity } from "@orm/entities/UserEntity";
import { UserGametagEntity } from "@orm/entities/UserGametagEntity";
import { User } from "discord.js";
import { EntityRepository, FindOneOptions, Repository } from "typeorm";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    public async ensure(id: string, options?: FindOneOptions<UserEntity>) {
		const previous = await this.findOne(id, options);
		if (previous) return previous;

		const data = new UserEntity();
		data.id = id;
		return data;
    }

    public async ensureEconomy(id: string, options: FindOneOptions<UserEntity> = {}) {
		const user = await this.ensure(id, { ...options, relations: ["economy"] });
		if (!user.economy) {
			user.economy = new UserEconomyEntity();
			user.economy.user = user;
		}

		return user as UserEntity & { profile: NonNullable<UserEntity["economy"]> };
	}

	public async fetchGametag<T>(gameName: string, user: User): Promise<UserGametagEntity<T>> {
		const { userGametagEntities } = await DbSet.connect();

		let gametagEntity = (await userGametagEntities.findOne({ where: { user: { id: user.id }, game: gameName } })) as UserGametagEntity<T>;
		if (gametagEntity) return gametagEntity;

		gametagEntity = new UserGametagEntity<T>();
		gametagEntity.game = gameName;
		gametagEntity.user = await this.ensure(user.id);

		return gametagEntity;
	}
}
