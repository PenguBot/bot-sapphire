import "module-alias/register";
import "reflect-metadata";
import { PenguClient } from "@lib/PenguClient";
import * as sentry from "@sentry/node";
import { BOT_TOKEN, TOKENS } from "@root/config";

const client = new PenguClient();

async function main() {
    if (TOKENS.SENTRY_DNS) sentry.init({ dsn: TOKENS.SENTRY_DNS });
    await client.login(BOT_TOKEN);
}

// TODO: Globally log error
main().catch(console.error);
