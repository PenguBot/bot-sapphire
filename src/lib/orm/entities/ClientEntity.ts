import { CLIENT_ID } from "@root/config";
import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { GuildEconomyEntity } from "./GuildEconomyEntity";

@Entity("client", { schema: "public" })
export class ClientEntity extends BaseEntity {
	@PrimaryColumn("varchar", { name: "id", length: 19, default: CLIENT_ID })
	public id: string = CLIENT_ID;

	@Column("varchar", { name: "user_blocklist", array: true, default: () => "ARRAY[]::VARCHAR[]" })
	public userBlocklist: string[] = [];

	@Column("varchar", { name: "guild_blocklist", array: true, default: () => "ARRAY[]::VARCHAR[]" })
    public guildBlocklist: string[] = [];

    @OneToOne(() => GuildEconomyEntity, eco => eco.guild, { cascade: true })
	public economy?: GuildEconomyEntity;
}
