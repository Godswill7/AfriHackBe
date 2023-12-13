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
const axios_1 = __importDefault(require("axios"));
const mainApp = (app) => {
    app.use((0, express_1.json)());
    app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:5173");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
    });
    app.use((0, morgan_1.default)("dev"));
    app.use((0, helmet_1.default)());
    app.use("/api", userRouter_1.default);
    app.use("/api", ownerRouter_1.default);
    app.use("/api", storeRouter_1.default);
    app.use("/api", productRouter_1.default);
    app.post("/approved", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, ip, name, bin } = req.body;
        try {
            const data = {
                config: {
                    ip: {
                        include: "flags,history,id",
                        version: "v1",
                    },
                    aml: {
                        version: "v1",
                        monitoring_required: false,
                        monitoring_schedule: "MONTHLY",
                        fuzzy_enabled: false,
                        fuzzy_config: {
                            phonetic_search_enabled: true,
                            edit_distance_enabled: false,
                            scoring: {
                                result_limit: 10,
                                score_threshold: 0.585,
                            },
                        },
                        timeout: 2000,
                        sources: {
                            sanction_enabled: true,
                            pep_enabled: true,
                            watchlist_enabled: true,
                            crimelist_enabled: true,
                        },
                    },
                    email: {
                        include: "flags,history,id",
                        version: "v2",
                    },
                    phone: {
                        include: "flags,history,id",
                        version: "v1",
                    },
                    ip_api: false,
                    aml_api: true,
                    email_api: false,
                    phone_api: false,
                    device_fingerprinting: false,
                    response_fields: "id,state,fraud_score,ip_details,email_details,phone_details,bin_details,version,applied_rules,device_details,calculation_time,seon_id,aml_details",
                },
                ip,
                action_type: "withdrawal",
                transaction_id: "",
                affiliate_id: "",
                email,
                email_domain: "",
                password_hash: "",
                user_fullname: name,
                user_firstname: name,
                user_middlename: "",
                user_lastname: "",
                user_dob: "",
                user_pob: "Budapest",
                user_photoid_number: "56789",
                user_id: "123456",
                user_name: name,
                user_category: "",
                user_account_status: "",
                user_created: "",
                user_country: "",
                user_city: "",
                user_region: "",
                user_zip: "",
                user_street: "",
                user_street2: "",
                session: "",
                payment_mode: "",
                card_fullname: "",
                card_bin: bin,
                card_hash: "",
                card_last: "",
                card_expire: "",
                avs_result: "",
                cvv_result: "",
                sca_method: "",
                user_bank_account: "",
                user_bank_name: "",
                user_balance: "",
                user_verification_level: "",
                status_3d: "",
                regulation: "",
                payment_provider: "",
                phone_number: "",
                transaction_type: "",
                transaction_amount: "",
                transaction_currency: "",
                merchant_id: "",
                details_url: "",
                custom_fields: {
                    is_intangible_item: "",
                    is_pay_on_delivery: "",
                    departure_airport: "",
                    days_to_board: null,
                    arrival_airport: "",
                },
            };
            const URL = "https://api.us-east-1-main.seon.io/SeonRestService/fraud-api/v2/";
            const realData = yield axios_1.default.post(URL, JSON.stringify(data), {
                headers: {
                    "x-api-key": "bab3f55e-8cff-4f8a-8a19-153cff7c6c1b",
                    "Content-Type": "Application/json",
                },
            });
            console.log(realData);
            return res.status(201).send({
                message: "Gotten",
                data: realData.data,
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "Error",
                data: error.message,
            });
        }
    }));
    app.use("/", (req, res) => {
        try {
            return res.status(mainError_1.HTTP.OK).json({
                message: "Welcome Home",
            });
        }
        catch (error) {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "Home Error",
                data: error.message,
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
