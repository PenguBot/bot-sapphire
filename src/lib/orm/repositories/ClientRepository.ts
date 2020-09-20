/* eslint-disable valid-jsdoc,@typescript-eslint/unified-signatures */
import { ClientEconomyEntity } from "@orm/entities/ClientEconomyEntity";
import { ClientEntity } from "@orm/entities/ClientEntity";
import { CLIENT_ID } from "@root/config";
import { EntityRepository, FindOneOptions, Repository } from "typeorm";

@EntityRepository(ClientEntity)
export class ClientRepository extends Repository<ClientEntity> {
	public async ensure(options?: FindOneOptions<ClientEntity>) {
		return (await this.findOne(CLIENT_ID, options)) ?? new ClientEntity();
    }

    public async ensureEconomy(options: FindOneOptions<ClientEntity> = {}) {
		const client = await this.ensure({ ...options, relations: ["economy"] });
		if (!client.economy) {
			client.economy = new ClientEconomyEntity();
			client.economy.client = client;
		}

		return client as ClientEntity & { economy: NonNullable<ClientEntity["economy"]> };
	}
}
