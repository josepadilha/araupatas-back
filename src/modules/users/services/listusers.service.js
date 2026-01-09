"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersService = void 0;
const database_1 = require("../../../config/database");
const User_1 = require("../entities/User");
class ListUsersService {
    async execute() {
        const repo = database_1.AppDataSource.getRepository(User_1.User);
        const users = await repo.find();
        return users;
    }
}
exports.ListUsersService = ListUsersService;
