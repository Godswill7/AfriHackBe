"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storeModel = new mongoose_1.Schema({
    storeName: {
        type: String,
    },
    userID: {
        type: String
    },
    product: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "products",
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("stores", storeModel);
