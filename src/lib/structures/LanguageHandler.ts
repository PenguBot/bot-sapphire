import { Cache } from "@klasa/cache";
import { promises } from "fs";
import i18next, { TFunction } from "i18next";
import Backend from "i18next-node-fs-backend";
import * as path from "path";
import { PenguClient } from "./PenguClient";

export class LanguageHandler {

	public languages!: Cache<string, TFunction>;

	public readonly kDirectory!: string;
	private readonly kOptions: i18nextNodeFsBackEnd.i18nextNodeFsBackEndOptions;
	private readonly kClient!: PenguClient;

	public constructor(client: PenguClient) {
		this.kClient = client;

		this.kDirectory = path.resolve(this.kClient.userBaseDirectory, "i18n");

		this.kOptions = {
			jsonIndent: 2,
			loadPath: path.resolve(this.kDirectory, path.sep, "{{lng}}/{{ns}}.json"),
			addPath: this.kDirectory
		};
	}

	public async init() {
		const { namespaces, languages } = await this.walkLanguageDirectory(this.kDirectory);

		i18next.use(Backend);

		await i18next.init({
			backend: this.kOptions,
			debug: false,
			fallbackLng: this.kClient.options.language || "en-US",
			load: "all",
			ns: namespaces,
			preload: languages
		});

		this.languages = new Cache(languages.map(item => [item, i18next.getFixedT(item)]));
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
