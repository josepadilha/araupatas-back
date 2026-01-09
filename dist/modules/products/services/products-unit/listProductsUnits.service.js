"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUnitService = void 0;
const database_1 = require("../../../../config/database");
const ProductUnit_1 = require("../../entities/ProductUnit");
class ListUnitService {
    async execute() {
        const repo = database_1.AppDataSource.getRepository(ProductUnit_1.ProductUnit);
        const units = await repo.find();
        return units;
    }
}
exports.ListUnitService = ListUnitService;
