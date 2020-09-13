"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGametagEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("./UserEntity");
let UserGametagEntity = class UserGametagEntity extends typeorm_1.BaseEntity {
    id;
    game;
    data;
    user;
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], UserGametagEntity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column("varchar", { length: 35 }),
    tslib_1.__metadata("design:type", String)
], UserGametagEntity.prototype, "game", void 0);
tslib_1.__decorate([
    typeorm_1.Column("jsonb"),
    tslib_1.__metadata("design:type", Object)
], UserGametagEntity.prototype, "data", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => UserEntity_1.UserEntity, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", UserEntity_1.UserEntity)
], UserGametagEntity.prototype, "user", void 0);
UserGametagEntity = tslib_1.__decorate([
    typeorm_1.Entity("user_gametag", { schema: "public" })
], UserGametagEntity);
exports.UserGametagEntity = UserGametagEntity;
//# sourceMappingURL=UserGametagEntity.js.map