"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveUsersController = exports.DesactiveUsersController = void 0;
const deleteUsers_service_1 = require("../services/deleteUsers.service");
class DesactiveUsersController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const service = new deleteUsers_service_1.DesactiveUserService();
            const result = await service.execute(id);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.DesactiveUsersController = DesactiveUsersController;
class ActiveUsersController {
    async handle(req, res) {
        try {
            const { id } = req.params;
            const service = new deleteUsers_service_1.ActiveUserService();
            const result = await service.execute(id);
            return res.status(200).json(result);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.ActiveUsersController = ActiveUsersController;
