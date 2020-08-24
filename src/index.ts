import "module-alias/register";
import "reflect-metadata";
import { PenguClient } from "@lib/PenguClient";
import { BOT_TOKEN, TOKENS } from "@root/config";
import * as Sentry from "@sentry/node";
import { DbSet } from "@lib/structures/DBSet";
import { RewriteFrames } from "@sentry/integrations";

global.__rootdir__ = __dirname || process.cwd();
const client = new PenguClient();

async function main() {
    if (TOKENS.SENTRY_DNS) {
        Sentry.init({
            dsn: TOKENS.SENTRY_DNS,
            integrations: [
                new Sentry.Integrations.Modules(),
                new Sentry.Integrations.FunctionToString(),
                new Sentry.Integrations.LinkedErrors(),
                new Sentry.Integrations.Console(),
                new Sentry.Integrations.Http({ breadcrumbs: true, tracing: true }),
                new RewriteFrames({ root: global.__rootdir__ })
            ]
        });
    }
    await DbSet.connect();
    await client.login(BOT_TOKEN);
}

// TODO: Globally log error
main().catch(console.error);

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface Global {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            __rootdir__: string;
        }
    }
}

