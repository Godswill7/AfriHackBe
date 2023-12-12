"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
    },
    role: {
        type: String,
    },
    store: [{
            type: mongoose_1.Types.ObjectId,
            ref: "stores"
        }]
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("users", userModel);
