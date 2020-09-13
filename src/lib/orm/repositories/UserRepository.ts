import { UserEntity } from "@orm/entities/UserEntity";
import { EntityRepository, FindOneOptions, Repository } from "typeorm";
import { DbSet } from "@lib/structures/DbSet";
import { UserGametagEntity } from "@orm/entities/UserGametagEntity";
import { User } from "discord.js";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    public async ensure(id: string, options?: FindOneOptions<UserEntity>) {
		const previous = await this.findOne(id, options);
		if (previous) return previous;

		const data = new UserEntity();
		data.id = id;
		return data;
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
