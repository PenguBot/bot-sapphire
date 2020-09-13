/* eslint-disable @typescript-eslint/naming-convention */
import { Emojis } from "@utils/Enums";
import { ClientOptions } from "discord.js";

export const DEV = "DEV" in process.env ? process.env.DEV === "true" : !("PM2_HOME" in process.env);

export const BOT_TOKEN = "";
export const PREFIX = "p!";

export const PGSQL_DATABASE_NAME = "";
export const PGSQL_DATABASE_PASSWORD = "";
export const PGSQL_DATABASE_USER = "";
export const PGSQL_DATABASE_PORT = 5432;
export const PGSQL_DATABASE_HOST = "localhost";

export const CLIENT_OPTIONS: ClientOptions = {
    i18n: {
        i18next: {
            interpolation: {
                defaultVariables: {
                    pCross: Emojis.PenguCross,
                    pCheck: Emojis.PenguCheck
                }
            }
        }
    }
};

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
