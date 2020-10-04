import { CLIENT_ID } from "@root/config";
import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { ClientEconomyEntity } from "./ClientEconomyEntity";

@Entity("client", { schema: "public" })
export class ClientEntity extends BaseEntity {
	@PrimaryColumn("varchar", { name: "id", length: 19, default: CLIENT_ID })
	public id: string = CLIENT_ID;

	@Column("varchar", { name: "user_blocklist", array: true, default: () => "ARRAY[]::VARCHAR[]" })
	public userBlocklist: string[] = [];

	@Column("varchar", { name: "guild_blocklist", array: true, default: () => "ARRAY[]::VARCHAR[]" })
    public guildBlocklist: string[] = [];

    @OneToOne(() => ClientEconomyEntity, eco => eco.client, { cascade: true })
	public economy?: ClientEconomyEntity;
}
