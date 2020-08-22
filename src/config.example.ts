/* eslint-disable @typescript-eslint/naming-convention */

import { KlasaClientOptions } from "klasa";

export const DEV = "DEV" in process.env ? process.env.DEV === "true" : !("PM2_HOME" in process.env);

export const TOKEN = "";
export const PRODUCTION = false;
export const OWNERS = [""];
export const PREFIX = "pd!";
export const SHARDS = "auto";

export const PGSQL_DATABASE_NAME = "";
export const PGSQL_DATABASE_PASSWORD = "";
export const PGSQL_DATABASE_USER = "";
export const PGSQL_DATABASE_PORT = 5432;
export const PGSQL_DATABASE_HOST = "localhost";

export const CLIENTOPTIONS: KlasaClientOptions = {
    shards: SHARDS,
    messageSweepInterval: 480,
    messageCacheLifetime: 120,
    commandMessageLifetime: 120,
    owners: OWNERS,
    prefix: PREFIX,
    production: PRODUCTION,
    prefixCaseInsensitive: true,
    noPrefixDM: true,
    language: "en-US",
    console: { useColor: true },
    pieceDefaults: {
        commands: { deletable: true, quotedStringSupport: true, bucket: 2 },
        monitors: { ignoreOthers: false }
    },
    disabledCorePieces: ["commands"],
    createPiecesFolders: false,
    commandEditing: true,
    regexPrefix: /^((?:Hey |Ok )?Pengu(?:,|!| ))/i,
    typing: false
};
