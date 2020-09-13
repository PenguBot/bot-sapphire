/* eslint-disable @typescript-eslint/naming-convention */
import { Emojis } from "@utils/Enums";
import { ClientOptions } from "discord.js";

export const CLIENT_OPTIONS: ClientOptions = {
    i18n: {
        i18next: {
            interpolation: {
                defaultVariables: {
                    pCross: Emojis.PenguCross,
                    pCheck: Emojis.PenguCheck,
                    pLoading: Emojis.PenguLoading
                }
            }
        }
    }
};
