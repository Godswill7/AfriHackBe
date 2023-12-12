"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOwnerStore = exports.findOwnerStore = exports.createStore = void 0;
const mainError_1 = require("../error/mainError");
const storeModel_1 = __importDefault(require("../model/storeModel"));
const ownerModel_1 = __importDefault(require("../model/ownerModel"));
const createStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { storeName } = req.body;
        const user = yield ownerModel_1.default.findById(userID);
        if (user) {
            if (user.verified && user.token === "") {
                const isStoreOwner = (user === null || user === void 0 ? void 0 : user.role) === "storeOwner";
                if (isStoreOwner) {
                    const existingStore = yield storeModel_1.default.findOne({ owner: user._id });
                    if (existingStore) {
                        const store = yield storeModel_1.default.create({
                            storeName,
                        });
                        return res.status(mainError_1.HTTP.CREATE).json({
                            message: "Store Created",
                            data: store,
                        });
                    }
                    else {
                        return res.status(mainError_1.HTTP.BAD).json({
                            message: "Store owner can only have one store.",
                        });
                    }
                }
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "You are not verified to create a store",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "User not found on storeOwner",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error creating store",
            data: error.message,
        });
    }
});
exports.createStore = createStore;
const findOwnerStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { storeID } = req.params;
        const isStoreOwner = yield ownerModel_1.default.findById(userID);
        if ((isStoreOwner === null || isStoreOwner === void 0 ? void 0 : isStoreOwner.role) === "storeOwner") {
            const store = yield storeModel_1.default.findById(storeID);
            if (store) {
                return res.status(mainError_1.HTTP.OK).json({
                    message: `you are viewing ${isStoreOwner.userName} stores`,
                    data: store,
                });
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "store does not exist",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "you are not a store owner to view this",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error finding store",
            data: error.message,
        });
    }
});
exports.findOwnerStore = findOwnerStore;
const deleteOwnerStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { storeID } = req.params;
        yield storeModel_1.default.findByIdAndDelete(storeID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "Store deleted",
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error deleting store",
            data: error.message,
        });
    }
});
exports.deleteOwnerStore = deleteOwnerStore;
