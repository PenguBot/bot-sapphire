"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floatPromise = exports.kBigIntTransformer = void 0;
const framework_1 = require("@sapphire/framework");
const utilities_1 = require("@sapphire/utilities");
exports.kBigIntTransformer = { from: Number, to: String };
function floatPromise(ctx, promise) {
    if (utilities_1.isThenable(promise))
        promise.catch(error => ctx.client.emit(framework_1.Events.Error, error));
}
exports.floatPromise = floatPromise;
//# sourceMappingURL=util.js.map