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
exports.sendAccountMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GOOGLE_REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const GOOGLE_SECRET = process.env.SECRET_GOOGLE;
const GOOGLE_ID = process.env.G_ID;
const GOOGLE_URL = process.env.G_URL;
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });
const sendAccountMail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "kossyuzoigwe@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            userToken: user.token,
        }, process.env.SECRET_KEY);
        const readData = path_1.default.join(__dirname, "../views/accountOpening.ejs");
        const html = yield ejs_1.default.renderFile(readData, {
            name: user.userName,
            token: user.token,
            email: user.email,
            url: `http://localhost:5173/api/${token}/verify-user`,
        });
        const mailer = {
            from: "Team Mace <kossyuzoigwe@gmail.com> ",
            to: user.email,
            subject: "Account Registration",
            html,
        };
        yield transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.sendAccountMail = sendAccountMail;
