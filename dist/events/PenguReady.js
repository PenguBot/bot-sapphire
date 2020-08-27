"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguReadyEvent = void 0;
const framework_1 = require("@sapphire/framework");
class PenguReadyEvent extends framework_1.Event {
    constructor(context) {
        super(context, { event: framework_1.Events.Ready, once: true });
    }
    async run() {
        await this.client.languages.init();
    }
}
exports.PenguReadyEvent = PenguReadyEvent;
//# sourceMappingURL=PenguReady.js.map