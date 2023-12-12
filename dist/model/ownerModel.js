"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ownerModel = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    },
    role: {
        type: String,
    },
    store: {
        type: []
    }
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("owners", ownerModel);
