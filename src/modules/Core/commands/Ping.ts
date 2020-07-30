import {
	Command, CommandOptions, CommandResponse, Module, CommandEnvironment
} from "axoncore";

import Pong from "./Ping_Pong";

class Ping extends Command {
	public constructor(module: Module) {
		super(module);

		this.label = "ping";
		this.aliases = [
			"ping",
			"pang",
			"pung"
		];

		this.hasSubcmd = true;

		this.info = {
			owners: ["KhaaZ"],
			name: "ping",
			description: "Ping the bot.",
			usage: "ping",
			examples: ["ping"]
		};

		this.options = new CommandOptions(this, {
			argsMin: 0,
			guildOnly: false
		});
	}

	public init() {
		return [Pong];
	}

	public async execute({ msg }: CommandEnvironment) {
		const start = Date.now();

		const mess = await this.sendMessage(msg.channel, "Pong! ");
		if (!mess) {
			return new CommandResponse({ success: false });
		}

		const diff = (Date.now() - start);
		await this.editMessage(mess, `Pong! \`${diff}ms\``);

		return new CommandResponse({ success: true });
	}
}

export default Ping;
