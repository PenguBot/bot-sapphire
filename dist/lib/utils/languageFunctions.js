"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
exports.list = (values, conjuction) => {
    switch (values.length) {
        case 0:
            return "";
        case 1:
            return values[0];
        case 2:
            return `${values[0]} ${conjuction} ${values[1]}`;
        default: {
            const trail = values.slice(0, -1);
            const head = values[values.length - 1];
            return `${trail.join(", ")}, ${conjuction} ${head}`;
        }
    }
};
//# sourceMappingURL=languageFunctions.js.map