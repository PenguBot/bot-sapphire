import { GuildRepository } from "@orm/repositories/GuildRepository";
import { UserRepository } from "@orm/repositories/UserRepository";
import type { Connection } from "typeorm";
import { UserGametagEntity } from "@orm/entities/UserGametagEntity";
export declare class DbSet {
    connection: Connection;
    private constructor();
    get guilds(): GuildRepository;
    get users(): UserRepository;
    get userGametagEntities(): import("typeorm").Repository<UserGametagEntity<unknown>>;
    static connect(): Promise<DbSet>;
}
