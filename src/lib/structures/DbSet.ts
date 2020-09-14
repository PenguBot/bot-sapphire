import { connect } from "@orm/dbConfig";
import { GuildRepository } from "@orm/repositories/GuildRepository";
import { UserRepository } from "@orm/repositories/UserRepository";
import type { Connection } from "typeorm";
import { UserGametagEntity } from "@orm/entities/UserGametagEntity";
import { UserEconomyEntity } from "@orm/entities/UserEconomyEntity";

export class DbSet {

	public connection: Connection;
	private constructor(connection: Connection) {
		this.connection = connection;
    }

    public get guilds() {
        return this.connection.getCustomRepository(GuildRepository);
    }

    public get users() {
        return this.connection.getCustomRepository(UserRepository);
    }

    public get userGametagEntities() {
        return this.connection.getRepository(UserGametagEntity);
    }

    public get userEconomyEntities() {
        return this.connection.getRepository(UserEconomyEntity);
    }

	public static async connect() {
		return new DbSet(await connect());
	}

}
