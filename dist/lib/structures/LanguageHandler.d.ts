import { Collection } from "discord.js";
import { TFunction } from "i18next";
export declare class LanguageHandler {
    languages: Collection<string, TFunction>;
    readonly kDirectory: string;
    private readonly kOptions;
    constructor(directory: string);
    init(): Promise<void>;
    private walkLanguageDirectory;
}
