/* eslint-disable @typescript-eslint/naming-convention */
import { PenguClient } from "@lib/PenguClient";
import { kBigIntTransformer } from "@utils/utils";
import { container } from "tsyringe";
import { AfterInsert, AfterLoad, AfterRemove, AfterUpdate, BaseEntity, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("user_economy", { schema: "public" })
export class UserEconomyEntity extends BaseEntity {
    @Column("bigint", { name: "balance", transformer: kBigIntTransformer, default: 0 })
    public balance = 0;

    @Column("bigint", { name: "vault", transformer: kBigIntTransformer, default: 0 })
    public vault = 0;

    // #region Overall balance periodic tax collection
    @Column("boolean", { name: "collect_taxes", default: false })
    public collectTaxes = false;

    @Column("timestamp without time zone", { name: "last_tax_collection", nullable: true, default: () => "null" })
	public lastTaxCollection?: Date | null = null;
    // #endregion Overall balance periodic tax collection

    // #region Global tax rate offsets
    @Column("numeric", { name: "tax_offset_general", precision: 8, default: 0 })
    public toGeneral = 0;

    @Column("numeric", { name: "tax_offset_gambling", precision: 8, default: 0 })
    public toGambling = 0;

    @Column("numeric", { name: "tax_offset_sales", precision: 8, default: 0 })
    public toSales = 0;
    // #endregion Global tax rate offsets

    @OneToOne(() => UserEntity, { primary: true, onDelete: "CASCADE" })
	@JoinColumn()
	public user?: UserEntity;

    private _balance: number | null;
    private _vault: number | null;

	public constructor() {
		super();
        this._balance = null;
        this._vault = null;
    }

    // @ts-expect-error 'client' is declared but its value is never read. ts(6133)
    private get client() {
		return container.resolve(PenguClient);
	}

	@AfterLoad()
	protected entityLoad() {
        this._balance = this.balance;
        this._vault = this.vault;
	}

	@AfterInsert()
	@AfterUpdate()
	protected entityUpdate() {
		if (this._balance !== null && this.balance !== this._balance) {
			this._balance = this.balance;
        }
        if (this._vault !== null && this.vault !== this._vault) {
			this._vault = this.vault;
		}
	}

	@AfterRemove()
	protected entityRemove() {
        this._balance = null;
        this._vault = null;
	}
}
