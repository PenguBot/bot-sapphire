import Discordjs, { Intents } from "discord.js";

import { AxonOptions } from "axoncore";

import Client from "./Client";

import botConfig from "./configs/config.json";
import secret from "./configs/secret.json";
import lang from "./configs/lang.json";

import MyUtils from "./MyUtils";

const axonOptions = new AxonOptions(
	{
		token: secret.bot.token,
		prefixes: botConfig.prefixes,
		settings: botConfig.settings,
		lang,
		logo: null,

		info: botConfig.info,
		staff: botConfig.staff,
		template: botConfig.template,
		custom: {
			param: 1
		}
	},
	secret.webhooks,
	{
		utils: MyUtils,
		logger: null,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		DBProvider: null,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		DBLocation: `${__dirname}/database/`,

		axonConfig: null,
		guildConfig: null
	}
);

const intents = new Intents(Intents.ALL).remove("GUILD_MESSAGE_TYPING");

/**
 * new AxonClient(token, erisOptions, AxonOptions, modules)
 *
 * new Client(token, erisOptions, AxonOptions) => Modules imported in Client
 */
const client = new Discordjs.Client(
	{
		disableMentions: "all",
		fetchAllMembers: false,
		messageCacheMaxSize: 100,
		ws: { intents }
	}
);

// eslint-disable-next-line @typescript-eslint/naming-convention
const Bot = new Client(
	client,
	axonOptions
);

export default Bot;
