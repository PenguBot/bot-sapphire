/* eslint-disable @typescript-eslint/naming-convention */
import { PenguClient } from "@lib/PenguClient";
import { kBigIntTransformer } from "@utils/util";
import { container } from "tsyringe";
import { AfterInsert, AfterLoad, AfterRemove, AfterUpdate, BaseEntity, Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { UserGametagEntity } from "./UserGametagEntity";

@Entity("user", { schema: "public" })
export class UserEntity extends BaseEntity {
	@PrimaryColumn("varchar", { name: "id", length: 19 })
    public id!: string;

    @Column("bigint", { name: "balance", default: 0, transformer: kBigIntTransformer })
    public balance = 0;

    @Column("bigint", { name: "vault", default: 0, transformer: kBigIntTransformer })
	public vault = 0;

	@OneToMany(() => UserGametagEntity, ge => ge.user, { cascade: true })
	public gametagEntity?: UserGametagEntity<unknown>[];

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
