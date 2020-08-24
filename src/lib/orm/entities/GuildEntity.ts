import { PREFIX } from "@root/config";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("guild", { schema: "public" })
export class GuildEntity extends BaseEntity {
	@PrimaryColumn("varchar", { name: "id", length: 19 })
    public id!: string;

    @Column("varchar", { name: "prefix", length: 20, default: PREFIX })
	public prefix: string = PREFIX;
}
