"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildEntity = void 0;
const tslib_1 = require("tslib");
const config_1 = require("@root/config");
const typeorm_1 = require("typeorm");
let GuildEntity = class GuildEntity extends typeorm_1.BaseEntity {
    id;
    prefix = config_1.PREFIX;
    language = "en-US";
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn("varchar", { name: "id", length: 19 }),
    tslib_1.__metadata("design:type", String)
], GuildEntity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column("varchar", { name: "prefix", length: 20, default: config_1.PREFIX }),
    tslib_1.__metadata("design:type", String)
], GuildEntity.prototype, "prefix", void 0);
tslib_1.__decorate([
    typeorm_1.Column("varchar", { name: "language", length: 10, default: "en-US" }),
    tslib_1.__metadata("design:type", Object)
], GuildEntity.prototype, "language", void 0);
GuildEntity = tslib_1.__decorate([
    typeorm_1.Entity("guild", { schema: "public" }),
    typeorm_1.Check(`"prefix"::text <> ''::text`)
], GuildEntity);
exports.GuildEntity = GuildEntity;
//# sourceMappingURL=GuildEntity.js.map