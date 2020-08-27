import { GuildRepository } from "@orm/repositories/GuildRepository";
import { UserRepository } from "@orm/repositories/UserRepository";
import type { Connection } from "typeorm";
export declare class DbSet {
    connection: Connection;
    private constructor();
    get guilds(): GuildRepository;
    get users(): UserRepository;
    static connect(): Promise<DbSet>;
}
