/* eslint-disable @typescript-eslint/naming-convention */
import { Emojis, PenguFormatters } from "@utils/Enums";
import { list } from "@utils/languageFunctions";
import { ClientOptions } from "discord.js";
import i18next from "i18next";

/**
 * @copyright 2019-2020 Antonio Román
 * @license Apache-2.0
 */
export const enum Time {
	Millisecond = 1,
	Second = 1000,
	Minute = 1000 * 60,
	Hour = 1000 * 60 * 60,
	Day = 1000 * 60 * 60 * 24,
	Year = 1000 * 60 * 60 * 24 * 365
}

export const CLIENT_OPTIONS: ClientOptions = {
    i18n: {
        i18next: {
            interpolation: {
                defaultVariables: {
                    pCross: Emojis.PenguCross,
                    pCheck: Emojis.PenguCheck,
                    pLoading: Emojis.PenguLoading
                },
                format: (value: unknown, format?: string, lng?: string) => {
                    switch (format as PenguFormatters) {
                        case PenguFormatters.AndList: {
                            return list(value as string[], i18next.t("global:and", { lng }));
                        }
                        case PenguFormatters.OrList: {
                            return list(value as string[], i18next.t("global:or", { lng }));
                        }
                        default:
                            return value as string;
                    }
                }
            }
        }
    }
};
