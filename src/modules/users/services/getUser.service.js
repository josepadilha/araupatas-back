"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserService = void 0;
const database_1 = require("../../../config/database");
const User_1 = require("../entities/User");
class GetUserService {
    async execute(id) {
        const repo = database_1.AppDataSource.getRepository(User_1.User);
        const user = await repo.findOne({
            where: {
                id,
            },
            withDeleted: true,
        });
        return user;
    }
}
exports.GetUserService = GetUserService;
