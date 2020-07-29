import { Module, CommandPermissions, AxonClient, ModuleData } from 'axoncore';

import * as commands from './commands/index';
// import * as listeners from './commands/index';

class Private extends Module {
    constructor(client: AxonClient, data: ModuleData = {} ) {
        super(client, data);

        this.label = 'Private';

        this.enabled = true;
        this.serverBypass = true;

        this.info = {
            name: 'Private',
            description: 'Very Private. Much Dev. Wow.',
        };

        this.permissions = new CommandPermissions(this, {}, true);
    }

    init() {
        return { commands };
    }
}

export default Private;
