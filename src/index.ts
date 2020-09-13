import "module-alias/register";
import "reflect-metadata";
import { PenguClient } from "@lib/PenguClient";
import { DbSet } from "@lib/structures/DbSet";
import { BOT_TOKEN, CLIENT_OPTIONS, TOKENS } from "@root/config";
import { Dedupe, ExtraErrorData, RewriteFrames } from "@sentry/integrations";
import * as Sentry from "@sentry/node";
import { floatPromise } from "@utils/util";

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
            new ExtraErrorData({ depth: 3 }),
            new RewriteFrames({ root: __dirname || process.cwd() })
        ]
    });
}

const client = new PenguClient(CLIENT_OPTIONS);

async function main() {
    await DbSet.connect();
    await client.login(BOT_TOKEN);
}

floatPromise({ client }, main());
