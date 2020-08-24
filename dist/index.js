"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("module-alias/register");
require("reflect-metadata");
const PenguClient_1 = require("@lib/PenguClient");
const config_1 = require("@root/config");
const Sentry = tslib_1.__importStar(require("@sentry/node"));
const DBSet_1 = require("@lib/structures/DBSet");
const integrations_1 = require("@sentry/integrations");
const __rootdir = __dirname || process.cwd();
if (config_1.TOKENS.SENTRY_DNS) {
    Sentry.init({
        dsn: config_1.TOKENS.SENTRY_DNS,
        integrations: [
            new Sentry.Integrations.Modules(),
            new Sentry.Integrations.FunctionToString(),
            new Sentry.Integrations.LinkedErrors(),
            new Sentry.Integrations.Console(),
            new Sentry.Integrations.Http({ breadcrumbs: true, tracing: true }),
            new integrations_1.Dedupe(),
            new integrations_1.ExtraErrorData({ depth: 2 }),
            new integrations_1.RewriteFrames({ root: __rootdir })
        ]
    });
}
const client = new PenguClient_1.PenguClient();
async function main() {
    await DBSet_1.DbSet.connect();
    await client.login(config_1.BOT_TOKEN);
}
main().catch(console.error);
//# sourceMappingURL=https://raw.githubusercontent.com/PenguBot/bot/build/dist/index.js.map