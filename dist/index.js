"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("module-alias/register");
require("reflect-metadata");
const PenguClient_1 = require("@lib/PenguClient");
const DbSet_1 = require("@lib/structures/DbSet");
const config_1 = require("@root/config");
const integrations_1 = require("@sentry/integrations");
const Sentry = tslib_1.__importStar(require("@sentry/node"));
const util_1 = require("@utils/util");
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
            new integrations_1.ExtraErrorData({ depth: 3 }),
            new integrations_1.RewriteFrames({ root: __dirname || process.cwd() })
        ]
    });
}
const client = new PenguClient_1.PenguClient(config_1.CLIENT_OPTIONS);
async function main() {
    await DbSet_1.DbSet.connect();
    await client.login(config_1.BOT_TOKEN);
}
util_1.floatPromise({ client }, main());
//# sourceMappingURL=index.js.map