/* eslint-disable @typescript-eslint/naming-convention */

import { KlasaClientOptions } from "klasa";

export const TOKEN = "";
export const PRODUCTION = false;
export const OWNERS = [""];
export const PREFIX = "pd!";
export const SHARDS = "auto";

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
    console: { useColor: true },
    pieceDefaults: {
        commands: { deletable: true, quotedStringSupport: true, bucket: 2 }
    },
    createPiecesFolders: false,
    commandEditing: true,
    regexPrefix: /^((?:Hey |Ok )?Pengu(?:,|!| ))/i,
    typing: false
};
