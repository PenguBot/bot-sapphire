import "module-alias/register";

import { ShardingManager } from "kurasuta";
import { ClientOptions } from "discord.js";
import { join } from "path";
import { PenguClient } from "@lib/structures/PenguClient";

import {
    TOKEN,
    CLIENTOPTIONS
} from "@root/config";

const manager = new ShardingManager(join(__dirname, "lib", "structures", "BaseCluster"), {
    token: TOKEN,
    client: PenguClient,
    shardCount: "auto",
    ipcSocket: 9454,
    timeout: 60000,
    clientOptions: CLIENTOPTIONS as ClientOptions
});

manager.spawn()
    .catch(console.error);
