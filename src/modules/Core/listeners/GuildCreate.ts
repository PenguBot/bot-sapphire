import { Listener, Module, ListenerData, GuildConfig } from 'axoncore';
import { Guild } from 'discord.js';

class GuildCreate extends Listener {
    constructor(module: Module, data: ListenerData = {} ) {
        super(module, data);

        /** Event Name (Discord name) */
        this.eventName = 'guildCreate';
        /** Event name (Function name) */
        this.label = 'guildCreate';

        this.enabled = true;

        this.info = {
            owners: ['KhaaZ'],
            description: 'Guild Create event',
        };
    }

    execute(guild: Guild, guildConfig: GuildConfig) { // eslint-disable-line 
        console.log(`Guild Created: ${guild.name} [${guild.id}]`);
        return Promise.resolve();
    }
}

export default GuildCreate;
