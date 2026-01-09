"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersController = void 0;
const listusers_service_1 = require("../services/listusers.service");
class ListUsersController {
    async handle(req, res) {
        try {
            const service = new listusers_service_1.ListUsersService();
            const users = await service.execute();
            return res.status(200).json(users);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.ListUsersController = ListUsersController;
