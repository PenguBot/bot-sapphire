import { connect } from "@orm/dbConfig";
import type { Connection } from "typeorm";

export class DbSet {

	public connection: Connection;
	private constructor(connection: Connection) {
		this.connection = connection;
	}

	public static async connect() {
		return new DbSet(await connect());
	}

}
