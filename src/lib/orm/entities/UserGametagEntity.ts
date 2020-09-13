import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity("user_gametag", { schema: "public" })
export class UserGametagEntity<T> extends BaseEntity {
	@PrimaryGeneratedColumn()
	public id!: number;

	@Column("varchar", { length: 35 })
	public game!: string;

	@Column("jsonb")
	public data?: T;

	@ManyToOne(() => UserEntity, { onDelete: "CASCADE" })
	@JoinColumn()
	public user?: UserEntity;
}
