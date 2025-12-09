require("ts-node/register");
require("dotenv/config");

const { AppDataSource } = require("./src/config/database");

module.exports = AppDataSource;
