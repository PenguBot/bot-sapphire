"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const tslib_1 = require("tslib");
const UserEntity_1 = require("@orm/entities/UserEntity");
const typeorm_1 = require("typeorm");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async ensure(id, options) {
        const previous = await this.findOne(id, options);
        if (previous)
            return previous;
        const data = new UserEntity_1.UserEntity();
        data.id = id;
        return data;
    }
};
UserRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(UserEntity_1.UserEntity)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map