import { LanguageHandler } from "@lib/structures/LanguageHandler";

declare module "klasa" {
    interface KlasaClient {
        i18n: LanguageHandler
    }
}
