import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { UserEconomyEntity } from "./UserEconomyEntity";
import { UserGametagEntity } from "./UserGametagEntity";

@Entity("user", { schema: "public" })
export class UserEntity extends BaseEntity {
	@PrimaryColumn("varchar", { name: "id", length: 19 })
    public id!: string;

	@OneToMany(() => UserGametagEntity, ge => ge.user, { cascade: true })
    public gametagEntity?: UserGametagEntity<unknown>[];

    @OneToOne(() => UserEconomyEntity, eco => eco.user, { cascade: true })
	public economy?: UserEconomyEntity;
}
