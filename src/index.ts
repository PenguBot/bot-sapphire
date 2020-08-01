import { ShardingManager } from "kurasuta";
import { ClientOptions } from "discord.js";
import { join } from "path";
import { PenguClient } from "@lib/structures/PenguClient";
import { KlasaClientOptions } from "@pengubot/antei";

import {
    TOKEN,
    SHARDS,
    OWNERS,
    PREFIX,
    PRODUCTION
} from "@root/config";

const clientOptions: KlasaClientOptions = {
    shards: SHARDS,
    messageSweepInterval: 480,
    messageCacheLifetime: 120,
    commandMessageLifetime: 120,
    owners: OWNERS,
    prefix: PREFIX,
    production: PRODUCTION,
    prefixCaseInsensitive: true,
    noPrefixDM: true,
    console: { useColor: true },
    pieceDefaults: {
        commands: { deletable: true, quotedStringSupport: true, bucket: 2 }
    },
    commandEditing: true,
    regexPrefix: /^((?:Hey |Ok )?Pengu(?:,|!| ))/i,
    typing: false
};

const manager = new ShardingManager(join(__dirname, "dist", "src", "lib", "structures", "BaseCluster"), {
    token: TOKEN,
    client: PenguClient,
    shardCount: "auto",
    ipcSocket: 9454,
    timeout: 60000,
    clientOptions: clientOptions as ClientOptions
});

manager.spawn()
    .catch(console.error);
