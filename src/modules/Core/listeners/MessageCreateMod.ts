import { Listener, Module, ListenerData, GuildConfig } from 'axoncore';
import { Message } from 'discord.js';

class MessageCreateMod extends Listener {
    constructor(module: Module, data: ListenerData = {} ) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'message';
        /** Event name (Function name) */
        this.label = 'messageCreateMod';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Log Message Create events',
        };
    }

    execute(message: Message, guildConfig: GuildConfig) { // eslint-disable-line
        if (guildConfig) {
            console.log(`Prefix: ${guildConfig.prefixes}`);
        }
        return Promise.resolve();
    }
}

export default MessageCreateMod;
