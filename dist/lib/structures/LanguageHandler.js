"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageHandler = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const i18next_node_fs_backend_1 = tslib_1.__importDefault(require("i18next-node-fs-backend"));
const path = tslib_1.__importStar(require("path"));
class LanguageHandler {
    languages;
    kDirectory;
    kOptions;
    constructor(directory) {
        this.kDirectory = directory;
        this.kOptions = {
            jsonIndent: 2,
            loadPath: path.join(this.kDirectory, "{{lng}}", "{{ns}}.json"),
            addPath: this.kDirectory
        };
    }
    async init() {
        const { namespaces, languages } = await this.walkLanguageDirectory(this.kDirectory);
        i18next_1.default.use(i18next_node_fs_backend_1.default);
        await i18next_1.default.init({
            backend: this.kOptions,
            debug: false,
            fallbackLng: "en-US",
            initImmediate: false,
            interpolation: { escapeValue: false },
            load: "all",
            ns: namespaces,
            preload: languages
        });
        this.languages = new discord_js_1.Collection(languages.map(item => [item, i18next_1.default.getFixedT(item)]));
    }
    async walkLanguageDirectory(dir, namespaces = [], folderName = "") {
        const files = await fs_1.promises.readdir(dir);
        const languages = [];
        for (const file of files) {
            const stat = await fs_1.promises.stat(path.join(dir, file));
            if (stat.isDirectory()) {
                const isLanguage = file.includes("-");
                if (isLanguage)
                    languages.push(file);
                const folder = await this.walkLanguageDirectory(path.join(dir, file), namespaces, isLanguage ? "" : `${file}/`);
                namespaces = folder.namespaces;
            }
            else {
                namespaces.push(`${folderName}${file.substr(0, file.length - 5)}`);
            }
        }
        return { namespaces: [...new Set(namespaces)], languages };
    }
}
exports.LanguageHandler = LanguageHandler;
//# sourceMappingURL=LanguageHandler.js.map