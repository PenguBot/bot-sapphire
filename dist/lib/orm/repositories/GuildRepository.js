"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildRepository = void 0;
const tslib_1 = require("tslib");
const GuildEntity_1 = require("@orm/entities/GuildEntity");
const typeorm_1 = require("typeorm");
let GuildRepository = class GuildRepository extends typeorm_1.Repository {
    async ensure(id, options) {
        const previous = await this.findOne(id, options);
        if (previous)
            return previous;
        const data = new GuildEntity_1.GuildEntity();
        data.id = id;
        return data;
    }
};
GuildRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(GuildEntity_1.GuildEntity)
], GuildRepository);
exports.GuildRepository = GuildRepository;
//# sourceMappingURL=https://raw.githubusercontent.com/PenguBot/bot/build/dist/lib/orm/repositories/GuildRepository.js.map