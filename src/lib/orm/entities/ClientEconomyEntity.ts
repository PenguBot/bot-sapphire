/* eslint-disable @typescript-eslint/naming-convention */
import { TAX_RATE_GAMBLING, TAX_RATE_GENERAL, TAX_RATE_SALES } from "@root/config";
import { BaseEntity, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { ClientEntity } from "./ClientEntity";


@Entity("client_economy", { schema: "public" })
export class ClientEconomyEntity extends BaseEntity {
    // #region Global tax rates
    @Column("numeric", { name: "tax_general", precision: 8, default: TAX_RATE_GENERAL })
    public tGeneral = TAX_RATE_GENERAL;

    @Column("numeric", { name: "tax_gambling", precision: 8, default: TAX_RATE_GAMBLING })
    public tGambling = TAX_RATE_GAMBLING;

    @Column("numeric", { name: "tax_sales", precision: 8, default: TAX_RATE_SALES })
    public tSales = TAX_RATE_SALES;
    // #endregion Global tax rates

    @OneToOne(() => ClientEntity, { primary: true, onDelete: "CASCADE" })
	@JoinColumn()
	public client?: ClientEntity;
}
