/* eslint-disable @typescript-eslint/naming-convention */
import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { GuildEntity } from "./GuildEntity";

@Entity("guild_economy", { schema: "public" })
export class GuildEconomyEntity extends BaseEntity {
    // #region Global tax rate offsets
    @Column("numeric", { name: "tax_offset_general", precision: 8, default: 0 })
    public toGeneral = 0;

    @Column("numeric", { name: "tax_offset_gambling", precision: 8, default: 0 })
    public toGambling = 0;

    @Column("numeric", { name: "tax_offset_sales", precision: 8, default: 0 })
    public toSales = 0;
    // #endregion Global tax rate offsets

    @OneToOne(() => GuildEntity, { primary: true, onDelete: "CASCADE" })
	@JoinColumn()
	public guild?: GuildEntity;
}
