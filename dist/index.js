"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const database_1 = require("./config/database");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = parseInt(process.env.PORT);
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
const server = app.listen(process.env.PORT || port, () => {
    console.log();
    (0, database_1.Database)();
});
process.on("uncaughtException", (error) => {
    console.log(`Error due to ${error.message}`);
});
process.on("unhandledRejection", (reason) => {
    console.log(`Error due to ${reason.message}`);
    server.close(() => {
        process.exit(1);
    });
});
