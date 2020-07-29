import { Listener, Module, ListenerData, GuildConfig } from 'axoncore';
import { Message, DMChannel } from 'discord.js';

class MessageCreateLog extends Listener {
    constructor(module: Module, data: ListenerData = {} ) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'message';
        /** Event name (Function name) */
        this.label = 'messageCreateLog';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Log Message Create events',
        };
    }

    execute(message: Message, guildConfig: GuildConfig) { // eslint-disable-line
        if (message.channel instanceof DMChannel) {
            return Promise.resolve();
        }
        console.log(`Msg ${message.channel.guild.id}`);
        return Promise.resolve();
    }
}

export default MessageCreateLog;
