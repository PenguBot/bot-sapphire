"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildEntity = void 0;
const tslib_1 = require("tslib");
const config_1 = require("@root/config");
const typeorm_1 = require("typeorm");
let GuildEntity = class GuildEntity extends typeorm_1.BaseEntity {
    id;
    prefix = config_1.PREFIX;
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn("varchar", { name: "id", length: 19 }),
    tslib_1.__metadata("design:type", String)
], GuildEntity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column("varchar", { name: "prefix", length: 20, default: config_1.PREFIX }),
    tslib_1.__metadata("design:type", String)
], GuildEntity.prototype, "prefix", void 0);
GuildEntity = tslib_1.__decorate([
    typeorm_1.Entity("guild", { schema: "public" })
], GuildEntity);
exports.GuildEntity = GuildEntity;
//# sourceMappingURL=https://raw.githubusercontent.com/PenguBot/bot/build/dist/lib/orm/entities/GuildEntity.js.map