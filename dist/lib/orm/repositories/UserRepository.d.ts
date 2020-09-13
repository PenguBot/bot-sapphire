import { UserEntity } from "@orm/entities/UserEntity";
import { FindOneOptions, Repository } from "typeorm";
import { UserGametagEntity } from "@orm/entities/UserGametagEntity";
import { User } from "discord.js";
export declare class UserRepository extends Repository<UserEntity> {
    ensure(id: string, options?: FindOneOptions<UserEntity>): Promise<UserEntity>;
    fetchGametag<T>(gameName: string, user: User): Promise<UserGametagEntity<T>>;
}
