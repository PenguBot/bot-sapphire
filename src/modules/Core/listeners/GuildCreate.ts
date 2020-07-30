import { Listener, Module, ListenerData } from "axoncore";
import { Guild } from "discord.js";

class GuildCreate extends Listener {
	public constructor(module: Module, data: ListenerData = {}) {
		super(module, data);

		/** Event Name (Discord name) */
		this.eventName = "guildCreate";
		/** Event name (Function name) */
		this.label = "guildCreate";

		this.enabled = true;

		this.info = {
			owners: ["KhaaZ"],
			description: "Guild Create event"
		};
	}

	public execute(guild: Guild) {
		console.log(`Guild Created: ${guild.name} [${guild.id}]`);
		return Promise.resolve();
	}
}

export default GuildCreate;
