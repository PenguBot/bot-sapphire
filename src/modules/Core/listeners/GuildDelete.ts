import { Listener, Module, ListenerData } from "axoncore";
import { Guild } from "discord.js";

class GuildDelete extends Listener {
	public constructor(module: Module, data: ListenerData = {}) {
		super(module, data);

		/** Event Name (Discord name) */
		this.eventName = "guildDelete";
		/** Event name (Function name) */
		this.label = "guildDelete";

		this.enabled = true;

		this.info = {
			owners: ["KhaaZ"],
			description: "Guild Delete event"
		};
	}

	public execute(guild: Guild) {
		console.log(`Guild Deleted: ${guild.name} [${guild.id}]`);
		return Promise.resolve();
	}
}

export default GuildDelete;
