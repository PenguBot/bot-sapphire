import "module-alias/register";
import "reflect-metadata";
import { PenguClient } from "@lib/PenguClient";
import { BOT_TOKEN, TOKENS } from "@root/config";
import * as Sentry from "@sentry/node";
import { DbSet } from "@lib/structures/DbSet";
import { Dedupe, ExtraErrorData, RewriteFrames } from "@sentry/integrations";

import { inspect } from "util";
inspect.defaultOptions.depth = 1;

// eslint-disable-next-line @typescript-eslint/naming-convention
const __rootdir = __dirname || process.cwd();

if (TOKENS.SENTRY_DNS) {
    Sentry.init({
        dsn: TOKENS.SENTRY_DNS,
        integrations: [
            new Sentry.Integrations.Modules(),
            new Sentry.Integrations.FunctionToString(),
            new Sentry.Integrations.LinkedErrors(),
            new Sentry.Integrations.Console(),
            new Sentry.Integrations.Http({ breadcrumbs: true, tracing: true }),
            new Dedupe(),
            new ExtraErrorData({ depth: 2 }),
            new RewriteFrames({ root: __rootdir })
        ]
    });
}

const client = new PenguClient();

async function main() {
    await DbSet.connect();
    await client.login(BOT_TOKEN);
}

// TODO: Globally log error
main().catch(console.error);
