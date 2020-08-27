import { UserEntity } from "@orm/entities/UserEntity";
import { FindOneOptions, Repository } from "typeorm";
export declare class UserRepository extends Repository<UserEntity> {
    ensure(id: string, options?: FindOneOptions<UserEntity>): Promise<UserEntity>;
}
