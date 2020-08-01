import { BaseEntity, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { UserEconomyEntity } from "./UserEconomyEntity";

@Entity("user", { schema: "public" })
export class UserEntity extends BaseEntity {

	@PrimaryColumn("varchar", { length: 19 })
	public id!: string;

	@OneToOne(() => UserEconomyEntity, economy => economy.user, { cascade: true })
	public economy?: UserEconomyEntity;

}
