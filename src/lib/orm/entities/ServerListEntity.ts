import { BaseEntity, Check, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("server_list", { schema: "public" })
@Check(/* sql */ `"bumps" >= 0`)
export class ServerListEntity extends BaseEntity {
	@PrimaryColumn("varchar", { name: "id", length: 19 })
    public id!: string;

    @Column("varchar", { name: "name", length: 30 })
    public name!: string;

    @Column("varchar", { name: "description", length: 256, nullable: true })
    public description?: string | null;

    @Column("varchar", { name: "icon_url", length: 128, nullable: true })
    public iconUrl?: string | null;

    @Column("varchar", { name: "invite", length: 128 })
    public invite!: string;

    @Column("boolean", { name: "discoverable", default: true })
    public discoverable = true;

    @Column("varchar", { name: "category", length: 256, nullable: true })
    public category?: string | null;

    @Column("integer", { name: "bumps", default: 0 })
    public bumps = 0;

    @Column("timestamp without time zone", { name: "last_bump", nullable: true, default: () => "null" })
	public lastBump?: Date | null = null;
}
