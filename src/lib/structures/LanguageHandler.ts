import { Collection } from "discord.js";
import { promises } from "fs";
import i18next, { TFunction } from "i18next";
import Backend from "i18next-node-fs-backend";
import * as path from "path";

export class LanguageHandler {

	public languages!: Collection<string, TFunction>;

	public readonly kDirectory!: string;
	private readonly kOptions: i18nextNodeFsBackEnd.i18nextNodeFsBackEndOptions;

	public constructor(directory: string) {
		this.kDirectory = directory;
		this.kOptions = {
			jsonIndent: 2,
			loadPath: path.join(this.kDirectory, "{{lng}}", "{{ns}}.json"),
			addPath: this.kDirectory
		};
	}

	public async init() {
		const { namespaces, languages } = await this.walkLanguageDirectory(this.kDirectory);

        i18next.use(Backend);
		await i18next.init({
			backend: this.kOptions,
			debug: false,
            fallbackLng: "en-US",
            initImmediate: false,
            interpolation: { escapeValue: false },
			load: "all",
			ns: namespaces,
			preload: languages
		});

		this.languages = new Collection(languages.map(item => [item, i18next.getFixedT(item)]));
	}

	/*
	 * @copyright 2020 TypicalBot LLC, Nicholas Sylke and the TypicalBot contributors
	 * @license Apache-2.0
	 */
	private async walkLanguageDirectory(dir: string, namespaces: string[] = [], folderName = "") {
		const files = await promises.readdir(dir);

		const languages: string[] = [];
		for (const file of files) {
			const stat = await promises.stat(path.join(dir, file));
			if (stat.isDirectory()) {
				const isLanguage = file.includes("-");
				if (isLanguage) languages.push(file);

				const folder = await this.walkLanguageDirectory(path.join(dir, file), namespaces, isLanguage ? "" : `${file}/`);

				// eslint-disable-next-line prefer-destructuring
				namespaces = folder.namespaces;
			} else {
				namespaces.push(`${folderName}${file.substr(0, file.length - 5)}`);
			}
		}

		return { namespaces: [...new Set(namespaces)], languages };
	}

}
