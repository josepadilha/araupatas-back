"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserController = void 0;
const createUser_service_1 = require("../services/createUser.service");
class CreateUserController {
    async handle(req, res) {
        const { name, email, password, role } = req.body;
        try {
            const service = new createUser_service_1.CreateUserService();
            const newUser = await service.execute({
                name,
                email,
                password,
                role,
            });
            return res.status(201).json(newUser);
        }
        catch (err) {
            return res.status(400).json({ error: err.message || err });
        }
    }
}
exports.CreateUserController = CreateUserController;
