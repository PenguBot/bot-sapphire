"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const tslib_1 = require("tslib");
const PenguClient_1 = require("@lib/PenguClient");
const util_1 = require("@utils/util");
const tsyringe_1 = require("tsyringe");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
    id;
    balance = 0;
    vault = 0;
    _balance;
    _vault;
    constructor() {
        super();
        this._balance = null;
        this._vault = null;
    }
    get client() {
        return tsyringe_1.container.resolve(PenguClient_1.PenguClient);
    }
    entityLoad() {
        this._balance = this.balance;
        this._vault = this.vault;
    }
    entityUpdate() {
        if (this._balance !== null && this.balance !== this._balance) {
            this._balance = this.balance;
        }
        if (this._vault !== null && this.vault !== this._vault) {
            this._vault = this.vault;
        }
    }
    entityRemove() {
        this._balance = null;
        this._vault = null;
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryColumn("varchar", { name: "id", length: 19 }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column("bigint", { name: "balance", default: 0, transformer: util_1.kBigIntTransformer }),
    tslib_1.__metadata("design:type", Object)
], UserEntity.prototype, "balance", void 0);
tslib_1.__decorate([
    typeorm_1.Column("bigint", { name: "vault", default: 0, transformer: util_1.kBigIntTransformer }),
    tslib_1.__metadata("design:type", Object)
], UserEntity.prototype, "vault", void 0);
tslib_1.__decorate([
    typeorm_1.AfterLoad(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UserEntity.prototype, "entityLoad", null);
tslib_1.__decorate([
    typeorm_1.AfterInsert(),
    typeorm_1.AfterUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UserEntity.prototype, "entityUpdate", null);
tslib_1.__decorate([
    typeorm_1.AfterRemove(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], UserEntity.prototype, "entityRemove", null);
UserEntity = tslib_1.__decorate([
    typeorm_1.Entity("user", { schema: "public" }),
    tslib_1.__metadata("design:paramtypes", [])
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=UserEntity.js.map