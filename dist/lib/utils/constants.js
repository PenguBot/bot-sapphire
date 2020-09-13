"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_OPTIONS = void 0;
const tslib_1 = require("tslib");
const languageFunctions_1 = require("@utils/languageFunctions");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
exports.CLIENT_OPTIONS = {
    i18n: {
        i18next: {
            interpolation: {
                defaultVariables: {
                    pCross: "<:penguError:435712890884849664>",
                    pCheck: "<:penguSuccess:435712876506775553>",
                    pLoading: "<a:penguLoad:435712860744581120>"
                },
                format: (value, format, lng) => {
                    switch (format) {
                        case "andList": {
                            return languageFunctions_1.list(value, i18next_1.default.t("global:and", { lng }));
                        }
                        case "orList": {
                            return languageFunctions_1.list(value, i18next_1.default.t("global:or", { lng }));
                        }
                        default:
                            return value;
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=constants.js.map