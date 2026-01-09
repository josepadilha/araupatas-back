"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserController = void 0;
const getUser_service_1 = require("../services/getUser.service");
class GetUserController {
    async handle(req, res) {
        try {
            const userId = req.params.id;
            const service = new getUser_service_1.GetUserService();
            const users = await service.execute(userId);
            return res.status(200).json(users);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.GetUserController = GetUserController;
