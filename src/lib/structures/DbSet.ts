import { connect } from "@orm/dbConfig";
import type { Connection } from "typeorm";
import { UserEntity } from "@orm/entities/UserEntity";
import { UserEconomyEntity } from "@orm/entities/UserEconomyEntity";
import { UserEconomyTaxEntity } from "@orm/entities/UserEconomyTaxEntity";

export class DbSet {

	public connection: Connection;
	private constructor(connection: Connection) {
		this.connection = connection;
    }

    public get users() {
        return this.connection.getCustomRepository(UserEntity);
    }

    public get userEconomies() {
        return this.connection.getCustomRepository(UserEconomyEntity);
    }

    public get userEconomyTaxer() {
        return this.connection.getCustomRepository(UserEconomyTaxEntity);
    }

	public static async connect() {
		return new DbSet(await connect());
	}

}
