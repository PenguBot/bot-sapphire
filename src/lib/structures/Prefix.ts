import { PenguClient } from "@lib/PenguClient";
import { DbSet } from "./DBSet";

export class Prefix {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private readonly client: PenguClient;

    public constructor(client: PenguClient) {
        this.client = client;
    }

    public async ensurePrefix(id: string) {
        const prefix = await this.client.redis.get(`${Prefix.KEY_PREFIX}${id}`);
        if (prefix !== null) return prefix;
        return this.ensurePrefixCache(id);
    }

    public async ensurePrefixCache(id: string) {
        const { guilds } = await DbSet.connect();
        const { prefix } = await guilds.ensure(id);
        await this.client.redis.set(`${Prefix.KEY_PREFIX}${id}`, prefix);
        return prefix;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static readonly KEY_PREFIX = "guild_prefix_";

}
