"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSubredditItem = exports.fetchSubreddit = exports.fetch = exports.floatPromise = exports.kBigIntTransformer = void 0;
const tslib_1 = require("tslib");
const framework_1 = require("@sapphire/framework");
const utilities_1 = require("@sapphire/utilities");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
exports.kBigIntTransformer = { from: Number, to: String };
function floatPromise(ctx, promise) {
    if (utilities_1.isThenable(promise))
        promise.catch(error => ctx.client.emit(framework_1.Events.Error, error));
}
exports.floatPromise = floatPromise;
async function fetch(url, options, type) {
    if (typeof options === "undefined") {
        options = {};
        type = 0;
    }
    else if (typeof options === "number") {
        type = options;
        options = {};
    }
    else if (typeof type === "undefined") {
        type = 0;
    }
    const result = await node_fetch_1.default(url, options);
    if (!result.ok) {
        console.error(new Error(`${url}\n${result.statusText}\n${await result.text()}`));
        return null;
    }
    switch (type) {
        case 3:
            return result;
        case 1:
            return result.buffer();
        case 0:
            return result.json();
        case 2:
            return result.text();
        default:
            throw new Error(`Unknown type ${type}`);
    }
}
exports.fetch = fetch;
async function fetchSubreddit(subreddit, type) {
    const res = await fetch(`https://www.reddit.com/r/${subreddit}${type?.length ? `/${type}` : ""}/.json?limit=100`);
    return res;
}
exports.fetchSubreddit = fetchSubreddit;
async function randomSubredditItem(subreddit, type) {
    const res = await fetchSubreddit(subreddit, type);
    const random = res.data.children[Math.floor(Math.random() * res.data.children.length)];
    return random;
}
exports.randomSubredditItem = randomSubredditItem;
//# sourceMappingURL=util.js.map