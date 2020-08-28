"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerListEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let ServerListEntity = class ServerListEntity extends typeorm_1.BaseEntity {
    id;
    name;
    description;
    iconUrl;
    invite;
    discoverable = true;
    category;
    bumps = 0;
    lastBump = null;
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn("varchar", { name: "id", length: 19 }),
    tslib_1.__metadata("design:type", String)
], ServerListEntity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column("varchar", { name: "name", length: 30 }),
    tslib_1.__metadata("design:type", String)
], ServerListEntity.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column("varchar", { name: "description", length: 256, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ServerListEntity.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column("varchar", { name: "icon_url", length: 128, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ServerListEntity.prototype, "iconUrl", void 0);
tslib_1.__decorate([
    typeorm_1.Column("varchar", { name: "invite", length: 128 }),
    tslib_1.__metadata("design:type", String)
], ServerListEntity.prototype, "invite", void 0);
tslib_1.__decorate([
    typeorm_1.Column("boolean", { name: "invite", default: true }),
    tslib_1.__metadata("design:type", Object)
], ServerListEntity.prototype, "discoverable", void 0);
tslib_1.__decorate([
    typeorm_1.Column("varchar", { name: "category", length: 256, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ServerListEntity.prototype, "category", void 0);
tslib_1.__decorate([
    typeorm_1.Column("integer", { name: "bumps", default: 0 }),
    tslib_1.__metadata("design:type", Object)
], ServerListEntity.prototype, "bumps", void 0);
tslib_1.__decorate([
    typeorm_1.Column("timestamp without time zone", { name: "last_bump", nullable: true, default: () => "null" }),
    tslib_1.__metadata("design:type", Object)
], ServerListEntity.prototype, "lastBump", void 0);
ServerListEntity = tslib_1.__decorate([
    typeorm_1.Entity("server_list", { schema: "public" }),
    typeorm_1.Check(`"bumps" >= 0`)
], ServerListEntity);
exports.ServerListEntity = ServerListEntity;
//# sourceMappingURL=ServerListEntity.js.map