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
exports.deleteProduct = exports.viewOneProducts = exports.viewAllProducts = exports.createProduct = void 0;
const mainError_1 = require("../error/mainError");
const productModel_1 = __importDefault(require("../model/productModel"));
const streamifier_1 = require("../utils/streamifier");
const ownerModel_1 = __importDefault(require("../model/ownerModel"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { name, description, price } = req.body;
        const findUser = yield ownerModel_1.default.findById(userID);
        let image = yield (0, streamifier_1.streamUpload)(req);
        if ((findUser === null || findUser === void 0 ? void 0 : findUser.role) === "storeOwner") {
            const products = yield productModel_1.default.create({
                name,
                description,
                price,
                image: image.secure_url,
                imageID: image.public_id,
            });
            findUser.store.push(products.id);
            yield (findUser === null || findUser === void 0 ? void 0 : findUser.save());
            return res.status(mainError_1.HTTP.CREATE).json({
                messsage: "Product Created",
                data: products,
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                messsage: "You don't have the right to create Product",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error creating product",
        });
    }
});
exports.createProduct = createProduct;
const viewAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const viewProducts = yield productModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "Viewing all products",
            data: viewProducts
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error viewing all products",
            data: error.message
        });
    }
});
exports.viewAllProducts = viewAllProducts;
const viewOneProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const viewProducts = yield productModel_1.default.findById(productID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "Viewing one product",
            data: viewProducts
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error viewing all products",
            data: error.message
        });
    }
});
exports.viewOneProducts = viewOneProducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        yield productModel_1.default.findByIdAndDelete(productID);
        return res.status(mainError_1.HTTP.DELETE).json({
            message: "Product Deleted",
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "Error deleting product",
            data: error.message,
        });
    }
});
exports.deleteProduct = deleteProduct;
