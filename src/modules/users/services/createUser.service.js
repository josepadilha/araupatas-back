"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const database_1 = require("../../../config/database");
const User_1 = require("../entities/User");
class CreateUserService {
    async execute({ name, email, password, role }) {
        const firebaseUser = await firebase_admin_1.default.auth().createUser({
            email,
            password,
        });
        const repo = database_1.AppDataSource.getRepository(User_1.User);
        const newUser = repo.create({
            id: firebaseUser.uid,
            name,
            email,
            role,
        });
        await repo.save(newUser);
        return newUser;
    }
}
exports.CreateUserService = CreateUserService;
