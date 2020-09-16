"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenguCommand = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const decorators_1 = require("@sapphire/decorators");
let PenguCommand = class PenguCommand extends framework_1.Command {
    run(message) {
        return message.sendTranslated("commands/general:ping.response");
    }
};
PenguCommand = tslib_1.__decorate([
    decorators_1.ApplyOptions({
        description: "commands/general:ping.description"
    })
], PenguCommand);
exports.PenguCommand = PenguCommand;
//# sourceMappingURL=ping.js.map