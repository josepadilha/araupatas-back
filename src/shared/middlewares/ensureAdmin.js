"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAdmin = ensureAdmin;
const database_1 = require("../../config/database");
const User_1 = require("../../modules/users/entities/User");
async function ensureAdmin(req, res, next) {
    const repo = database_1.AppDataSource.getRepository(User_1.User);
    const user = await repo.findOne({ where: { id: req.user.id } });
    if (!user) {
        return res.status(401).json({ message: "User not found" });
    }
    if (user.role !== "admin") {
        return res.status(403).json({ message: "Only admin allowed" });
    }
    return next();
}
