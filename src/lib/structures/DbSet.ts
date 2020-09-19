import { connect } from "@orm/dbConfig";
import { GuildEconomyEntity } from "@orm/entities/GuildEconomyEntity";
import { UserEconomyEntity } from "@orm/entities/UserEconomyEntity";
import { UserGametagEntity } from "@orm/entities/UserGametagEntity";
import { ClientRepository } from "@orm/repositories/ClientRepository";
import { GuildRepository } from "@orm/repositories/GuildRepository";
import { UserRepository } from "@orm/repositories/UserRepository";
import type { Connection } from "typeorm";

export class DbSet {

	public connection: Connection;
	private constructor(connection: Connection) {
		this.connection = connection;
    }

    public get clients() {
        return this.connection.getCustomRepository(ClientRepository);
    }

    public get guilds() {
        return this.connection.getCustomRepository(GuildRepository);
    }

    public get guildEconomyEntities() {
        return this.connection.getRepository(GuildEconomyEntity);
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
