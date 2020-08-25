import { BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity("user", { schema: "public" })
export class UserEntity extends BaseEntity {
	@PrimaryColumn("varchar", { name: "id", length: 19 })
    public id!: string;
}
