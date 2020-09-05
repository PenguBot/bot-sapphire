import { PenguClient } from "@lib/PenguClient";
import { CacheKey } from "@utils/Enums";
export declare class CacheManager {
    private readonly client;
    constructor(client: PenguClient);
    set(key: string, value: string, type: CacheKey): Promise<"OK" | null>;
    get(key: string, type: CacheKey): Promise<string | null>;
    has(key: string, type: CacheKey): Promise<boolean>;
    getPrefix(id: string): Promise<string>;
    getLanguage(id: string): Promise<string>;
    ensureGuildSettings(id: string): Promise<import("../orm/entities/GuildEntity").GuildEntity>;
    static readonly SEPERATOR = "_";
}
