import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { UserCooldownEntity } from "./UserCooldownEntity";
import { UserEconomyEntity } from "./UserEconomyEntity";
import { UserGametagEntity } from "./UserGametagEntity";

@Entity("user", { schema: "public" })
export class UserEntity extends BaseEntity {
	@PrimaryColumn("varchar", { name: "id", length: 19 })
    public id!: string;

    @OneToOne(() => UserCooldownEntity, cooldown => cooldown.user, { cascade: true })
    public cooldowns?: UserCooldownEntity;

    @OneToOne(() => UserEconomyEntity, eco => eco.user, { cascade: true })
	public economy?: UserEconomyEntity;

	@OneToMany(() => UserGametagEntity, ge => ge.user, { cascade: true })
    public gametagEntity?: UserGametagEntity<unknown>[];
}
