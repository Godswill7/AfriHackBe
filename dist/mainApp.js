"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mainError_1 = require("./error/mainError");
const errorHandler_1 = require("./error/errorHandler");
const userRouter_1 = __importDefault(require("./router/userRouter"));
const ownerRouter_1 = __importDefault(require("./router/ownerRouter"));
const storeRouter_1 = __importDefault(require("./router/storeRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const mainApp = (app) => {
    app.use((0, express_1.json)());
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use((0, helmet_1.default)());
    app.use("/api", userRouter_1.default);
    app.use("/api", ownerRouter_1.default);
    app.use("/api", storeRouter_1.default);
    app.use("/api", productRouter_1.default);
    app.use("/", (req, res) => {
        try {
            return res.status(mainError_1.HTTP.OK).json({
                message: "Welcome Home"
            });
        }
        catch (error) {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "Home Error",
                data: error.message
            });
        }
    });
    app.use("*", (req, res, next) => {
        next(new mainError_1.mainError({
            name: "Route Error",
            message: `Incorrect url ${req.originalUrl} does not exist`,
            status: mainError_1.HTTP.BAD,
            success: false,
        }));
    });
    app.use(errorHandler_1.errorHandler);
};
exports.mainApp = mainApp;
