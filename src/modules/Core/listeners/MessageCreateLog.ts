import { Listener, Module, ListenerData } from "axoncore";
import { Message, DMChannel } from "discord.js";

class MessageCreateLog extends Listener {
	public constructor(module: Module, data: ListenerData = {}) {
		super(module, data);

		/** Event Name (Discord name) */
		this.eventName = "message";
		/** Event name (Function name) */
		this.label = "messageCreateLog";

		this.enabled = true;

		this.info = {
			owners: ["KhaaZ"],
			description: "Log Message Create events"
		};
	}

	public execute(message: Message) {
		if (message.channel instanceof DMChannel) {
			return Promise.resolve();
		}
		console.log(`Msg ${message.channel.guild.id}`);
		return Promise.resolve();
	}
}

export default MessageCreateLog;
