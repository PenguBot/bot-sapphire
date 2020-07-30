import {
	AxonClient, AxonOptions, GuildConfig, Command, CommandEnvironment
} from "axoncore";
import * as djs from "discord.js";

import * as modules from "./modules/index";

/**
 * Example - Client constructor
 *
 * @author KhaaZ
 *
 * @class Client
 * @extends AxonCore.AxonClient
 */
class Client extends AxonClient {
	public constructor(client: djs.Client, axonOptions: AxonOptions) {
		super(client, axonOptions, modules);
	}

	public onInit(): true {
		this.staff.contributors = [];
		return true;
	}

	public onStart(): Promise<true> {
		return Promise.resolve(true);
	}

	public onReady(): Promise<true> {
		return Promise.resolve(true);
	}

	public async initStatus() {
		// called after ready event
		// overrides default editStatus
		// used to setup custom status
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		await this.botClient.user!.setPresence({
			status: "online",
			activity: {
				name: `AxonCore | ${this.settings.prefixes[0]}help`,
				type: 0
			}
		});
	}

	// disabled
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public $sendFullHelp(msg: djs.Message, guildConfig: GuildConfig): Promise<djs.Message> {
		// override sendFullHelp method
		return this.axonUtils.sendMessage(msg.channel, "Full Help override");
	}

	// disabled
	public $sendHelp(command: Command, env: CommandEnvironment): Promise<djs.Message> {
		// override sendHelp method
		return this.axonUtils.sendMessage(env.msg.channel, `Help override for ${command.label}`);
	}
}

export default Client;
