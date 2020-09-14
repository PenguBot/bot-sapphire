import { PREFIX } from "@root/config";
import { BaseEntity, Check, Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { GuildEconomyEntity } from "./GuildEconomyEntity";

@Entity("guild", { schema: "public" })
@Check(/* sql */ `"prefix"::text <> ''::text`)
export class GuildEntity extends BaseEntity {
	@PrimaryColumn("varchar", { name: "id", length: 19 })
    public id!: string;

    @Column("varchar", { name: "prefix", length: 20, default: PREFIX })
    public prefix: string = PREFIX;

    @Column("varchar", { name: "language", length: 10, default: "en-US" })
    public language = "en-US";

    @OneToOne(() => GuildEconomyEntity, eco => eco.guild, { cascade: true })
	public economy?: GuildEconomyEntity;
}
