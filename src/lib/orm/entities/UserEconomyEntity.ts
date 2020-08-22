import { BaseEntity, Entity, OneToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import { UserEconomyTaxEntity } from "./UserEconomyTaxEntity";

@Entity("user_economy", { schema: "public" })
export class UserEconomyEntity extends BaseEntity {

    @OneToOne(() => UserEntity, { primary: true, onDelete: "CASCADE" })
	@JoinColumn()
    public user?: UserEntity;

    @OneToOne(() => UserEconomyTaxEntity, tax => tax.economy, { cascade: true })
	public tax?: UserEconomyTaxEntity;

}
