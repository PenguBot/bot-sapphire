/* eslint-disable valid-jsdoc */
import { AsyncQueue } from "@klasa/async-queue";
import { TimerManager } from "@klasa/timer-manager";
import { DbSet } from "@lib/structures/DbSet";
import { UserCooldownEntity } from "@orm/entities/UserCooldownEntity";
import { UserEconomyEntity } from "@orm/entities/UserEconomyEntity";
import { UserEntity } from "@orm/entities/UserEntity";
import { UserGametagEntity } from "@orm/entities/UserGametagEntity";
import { Collection, User } from "discord.js";
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

    public async ensureCooldowns(id: string, options: FindOneOptions<UserEntity> = {}) {
		const user = await this.ensure(id, { ...options, relations: ["cooldowns"] });
		if (!user.cooldowns) {
			user.cooldowns = new UserCooldownEntity();
			user.cooldowns.user = user;
		}

		return user as UserEntity & { cooldowns: NonNullable<UserEntity["cooldowns"]> };
	}

    public async ensureEconomy(id: string, options: FindOneOptions<UserEntity> = {}) {
		const user = await this.ensure(id, { ...options, relations: ["economy"] });
		if (!user.economy) {
			user.economy = new UserEconomyEntity();
			user.economy.user = user;
		}

		return user as UserEntity & { economy: NonNullable<UserEntity["economy"]> };
    }

    public async ensureCooldownsAndEconomy(id: string, options: FindOneOptions<UserEntity> = {}) {
        const user = await this.ensure(id, { ...options, relations: ["cooldowns", "economy"] });
        if (!user.cooldowns) {
			user.cooldowns = new UserCooldownEntity();
			user.cooldowns.user = user;
        }

		if (!user.economy) {
			user.economy = new UserEconomyEntity();
			user.economy.user = user;
		}

		return user as UserEntity & { cooldowns: NonNullable<UserEntity["cooldowns"]>; economy: NonNullable<UserEntity["economy"]> };
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

    /**
     * @copyright 2019-2020 Antonio Román
     * @license Apache-2.0
     */
	public async lock<T>(targets: readonly string[], cb: (...targets: readonly string[]) => Promise<T>): Promise<T> {
		if (targets.length !== new Set(targets).size) {
			throw new Error(`Duplicated targets detected: '${targets.join("', '")}'`);
		}

		const queues = targets.map(target => {
			const existing = UserRepository.queues.get(target);
			if (existing) return existing;

			const created = new AsyncQueue();
			UserRepository.queues.set(target, created);
			return created;
		});

		await Promise.all(queues.map(queue => queue.wait()));

		try {
			return await cb(...targets);
		} finally {
			for (const queue of queues) queue.shift();
		}
	}

    /**
     * @copyright 2019-2020 Antonio Román
     * @license Apache-2.0
     */
    public static queues = new Collection<string, AsyncQueue>();
}

/**
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */
TimerManager.setInterval(() => {
	UserRepository.queues.sweep(value => value.remaining === 0);
}, 60000);
