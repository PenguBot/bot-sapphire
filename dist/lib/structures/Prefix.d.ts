import { PenguClient } from "@lib/PenguClient";
export declare class Prefix {
    private readonly client;
    constructor(client: PenguClient);
    ensurePrefix(id: string): Promise<string>;
    ensurePrefixCache(id: string): Promise<string>;
    static readonly KEY_PREFIX = "guild_prefix_";
}
