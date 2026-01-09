"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveUserService = exports.DesactiveUserService = void 0;
const database_1 = require("../../../config/database");
const User_1 = require("../entities/User");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
class DesactiveUserService {
    async execute(id) {
        const repo = database_1.AppDataSource.getRepository(User_1.User);
        const user = await repo.findOne({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }
        await firebase_admin_1.default.auth().updateUser(id, {
            disabled: true,
        });
        user.isActive = false;
        await repo.save(user);
        return { message: "User disabled in Firebase and soft deleted locally" };
    }
}
exports.DesactiveUserService = DesactiveUserService;
class ActiveUserService {
    async execute(id) {
        const repo = database_1.AppDataSource.getRepository(User_1.User);
        const user = await repo.findOne({ where: { id } });
        if (!user) {
            throw new Error("User not found");
        }
        await firebase_admin_1.default.auth().updateUser(id, {
            disabled: false,
        });
        user.isActive = true;
        await repo.save(user);
        return { message: "User activated" };
    }
}
exports.ActiveUserService = ActiveUserService;
