import { BaseEntity, Entity, OneToOne, JoinColumn } from "typeorm";
import { UserEconomyEntity } from "./UserEconomyEntity";

@Entity("user_economy_tax", { schema: "public" })
export class UserEconomyTaxEntity extends BaseEntity {

    @OneToOne(() => UserEconomyEntity, { primary: true, onDelete: "CASCADE" })
	@JoinColumn()
	public economy?: UserEconomyEntity;

}
