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
exports.findOneUser = exports.findAllUser = exports.deleteUser = exports.verifyUser = exports.signInUser = exports.createUser = void 0;
const email_1 = require("./../utils/email");
const mainError_1 = require("../error/mainError");
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const role_1 = require("../config/role");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password } = req.body;
        const encrypt = yield bcrypt_1.default.genSalt(10);
        const decipher = yield bcrypt_1.default.hash(password, encrypt);
        const token = crypto_1.default.randomBytes(2).toString("hex");
        const user = yield userModel_1.default.create({
            userName,
            email,
            token,
            password: decipher,
            role: role_1.Role.USER,
        });
        (0, email_1.sendAccountMail)(user).then(() => {
            console.log("Mail Sent ...");
        });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "User created Successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error creating User",
            data: error.message,
        });
    }
});
exports.createUser = createUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const checkPassword = yield bcrypt_1.default.compare(password, user.password);
            if (checkPassword) {
                if (user.verified && user.token === "") {
                    return res.status(mainError_1.HTTP.OK).json({
                        message: "Sign In successfull",
                        data: user
                    });
                }
                else {
                    return res.status(mainError_1.HTTP.BAD).json({
                        message: "User is not verified",
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
                message: "User does not exist",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error creating User",
            data: error.message,
        });
    }
});
exports.signInUser = signInUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const getUser = yield userModel_1.default.findById(userID);
        if (getUser) {
            const realUser = yield userModel_1.default.findByIdAndUpdate(getUser._id, { verified: true, token: "" }, { new: true });
            return res.status(mainError_1.HTTP.UPDATE).json({
                message: "user Verified",
                data: realUser,
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "token Invalid / User does not exist"
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error verifying user",
            data: error,
        });
    }
});
exports.verifyUser = verifyUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        yield userModel_1.default.findByIdAndDelete(userID);
        return res.status(mainError_1.HTTP.DELETE).json({
            message: "User deleted",
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error deleting User",
            data: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
const findAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAllUser = yield userModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "All Users Successfully found",
            data: findAllUser,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error finding all User",
            data: error.message,
        });
    }
});
exports.findAllUser = findAllUser;
const findOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const findUser = yield userModel_1.default.findById(userID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "User Successfully found",
            data: findUser,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error finding one User",
            data: error.message,
        });
    }
});
exports.findOneUser = findOneUser;
