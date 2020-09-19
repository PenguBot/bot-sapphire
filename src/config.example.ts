/* eslint-disable @typescript-eslint/naming-convention */
import { ClientOptions } from "discord.js";

export const DEV = "DEV" in process.env ? process.env.DEV === "true" : !("PM2_HOME" in process.env);

export const BOT_TOKEN = "";
export const CLIENT_ID = "303181184718995457";
export const PREFIX = "p!";

export const TAX_RATE_GENERAL = 15;
export const TAX_RATE_GAMBLING = 7.5;
export const TAX_RATE_SALES = 22;

export const PGSQL_DATABASE_NAME = "";
export const PGSQL_DATABASE_PASSWORD = "";
export const PGSQL_DATABASE_USER = "";
export const PGSQL_DATABASE_PORT = 5432;
export const PGSQL_DATABASE_HOST = "localhost";

export const CLIENT_OPTIONS: ClientOptions = { };

export const API_KEYS = {
    OSU: "",
    FORTNITE: "",
    CSGO: "",
    COC: "",
    TRACKER: ""
};

export const TOKENS = {
    BOT_TOKEN,
    SENTRY_DNS: ""
};
