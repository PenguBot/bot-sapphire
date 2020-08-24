import { GuildRepository } from "@orm/repositories/GuildRepository";
import type { Connection } from "typeorm";
export declare class DbSet {
    connection: Connection;
    private constructor();
    get guilds(): GuildRepository;
    static connect(): Promise<DbSet>;
}
