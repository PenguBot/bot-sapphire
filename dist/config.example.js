"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKENS = exports.API_KEYS = exports.CLIENT_OPTIONS = exports.PGSQL_DATABASE_HOST = exports.PGSQL_DATABASE_PORT = exports.PGSQL_DATABASE_USER = exports.PGSQL_DATABASE_PASSWORD = exports.PGSQL_DATABASE_NAME = exports.PREFIX = exports.BOT_TOKEN = exports.DEV = void 0;
exports.DEV = "DEV" in process.env ? process.env.DEV === "true" : !("PM2_HOME" in process.env);
exports.BOT_TOKEN = "";
exports.PREFIX = "p!";
exports.PGSQL_DATABASE_NAME = "";
exports.PGSQL_DATABASE_PASSWORD = "";
exports.PGSQL_DATABASE_USER = "";
exports.PGSQL_DATABASE_PORT = 5432;
exports.PGSQL_DATABASE_HOST = "localhost";
exports.CLIENT_OPTIONS = {
    i18n: {
        i18next: {
            interpolation: {
                defaultVariables: {
                    pCross: "<:penguError:435712890884849664>",
                    pCheck: "<:penguSuccess:435712876506775553>"
                }
            }
        }
    }
};
exports.API_KEYS = {
    OSU: "",
    FORTNITE: "",
    CSGO: "",
    COC: "",
    TRACKER: ""
};
exports.TOKENS = {
    BOT_TOKEN: exports.BOT_TOKEN,
    SENTRY_DNS: ""
};
//# sourceMappingURL=config.example.js.map