import { PREFIX } from "@root/config";
import { BaseEntity, Check, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("guild", { schema: "public" })
@Check(/* sql */ `"prefix"::text <> ''::text`)
export class GuildEntity extends BaseEntity {
	@PrimaryColumn("varchar", { name: "id", length: 19 })
    public id!: string;

    @Column("varchar", { name: "prefix", length: 20, default: PREFIX })
    public prefix: string = PREFIX;

    @Column("varchar", { name: "language", length: 10, default: "en-US" })
	public language = "en-US";
}
