/* eslint-disable @typescript-eslint/naming-convention */
export const DEV = "DEV" in process.env ? process.env.DEV === "true" : !("PM2_HOME" in process.env);

export const BOT_TOKEN = "";
export const PREFIX = "p!";

export const PGSQL_DATABASE_NAME = "";
export const PGSQL_DATABASE_PASSWORD = "";
export const PGSQL_DATABASE_USER = "";
export const PGSQL_DATABASE_PORT = 5432;
export const PGSQL_DATABASE_HOST = "localhost";

export const TOKENS = {
    BOT_TOKEN,
    SENTRY_DNS: ""
};
