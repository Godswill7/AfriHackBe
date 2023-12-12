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
exports.findOneOwner = exports.findAllOwner = exports.deleteOwner = exports.verifyOwner = exports.signInOwner = exports.createStoreOwner = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mainError_1 = require("../error/mainError");
const role_1 = require("../config/role");
const ownerModel_1 = __importDefault(require("../model/ownerModel"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const email_1 = require("../utils/email");
dotenv_1.default.config();
const createStoreOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const encrypt = yield bcrypt_1.default.genSalt(10);
        const decipher = yield bcrypt_1.default.hash(password, encrypt);
        const token = crypto_1.default.randomBytes(2).toString("hex");
        const storeOwner = yield ownerModel_1.default.create({
            userName,
            email,
            token,
            password: decipher,
            role: role_1.Role.STOREOWNER,
        });
        (0, email_1.sendAccountMail)(storeOwner).then(() => {
            console.log("Mail Sent ...");
        });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "storeOwner created Successfully",
            data: storeOwner,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error creating storeOwner",
            data: error.message,
        });
    }
});
exports.createStoreOwner = createStoreOwner;
const signInOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const owner = yield ownerModel_1.default.findOne({ email });
        if ((owner === null || owner === void 0 ? void 0 : owner.role) === role_1.Role.STOREOWNER) {
            const checkPassword = yield bcrypt_1.default.compare(password, owner.password);
            if (checkPassword) {
                if (owner.verified && owner.token === "") {
                    return res.status(mainError_1.HTTP.OK).json({
                        message: " StoreOwner Sign In successfull",
                        data: owner
                    });
                }
                else {
                    return res.status(mainError_1.HTTP.BAD).json({
                        message: "StoreOwner is not verified",
                    });
                }
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "Incorrect Password",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "u re not a store owner/StoreOwner does not exist",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error creating StoreOwner",
            data: error.message,
        });
    }
});
exports.signInOwner = signInOwner;
const verifyOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerID } = req.params;
        const getOwner = yield ownerModel_1.default.findById(ownerID);
        if (getOwner) {
            const realOwner = yield ownerModel_1.default.findByIdAndUpdate(getOwner === null || getOwner === void 0 ? void 0 : getOwner._id, { verified: true, token: "" }, { new: true });
            return res.status(mainError_1.HTTP.UPDATE).json({
                message: "owner Verified",
                data: realOwner,
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "storeOwner does not exist",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error verifying owner",
            data: error,
        });
    }
});
exports.verifyOwner = verifyOwner;
const deleteOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerID } = req.params;
        yield ownerModel_1.default.findByIdAndDelete(ownerID);
        return res.status(mainError_1.HTTP.DELETE).json({
            message: "Owner deleted",
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error deleting Owner",
            data: error.message,
        });
    }
});
exports.deleteOwner = deleteOwner;
const findAllOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllOwners = yield ownerModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "All Owners Successfully found",
            data: findAllOwners,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error finding all User",
            data: error.message,
        });
    }
});
exports.findAllOwner = findAllOwner;
const findOneOwner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ownerID } = req.params;
        const findOwner = yield ownerModel_1.default.findById(ownerID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "Owner Successfully found",
            data: findOwner,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error finding one Owner",
            data: error.message,
        });
    }
});
exports.findOneOwner = findOneOwner;
