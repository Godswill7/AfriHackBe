"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controller/productController");
const multer_1 = __importDefault(require("multer"));
let uploadData = (0, multer_1.default)();
const router = (0, express_1.Router)();
router.route("/:userID/create-product").post(uploadData.single("image"), productController_1.createProduct);
router.route("/view-product").get(productController_1.viewAllProducts);
router.route("/:productID/view-products").delete(productController_1.viewOneProducts);
router.route("/:productID/delete-product").delete(productController_1.deleteProduct);
exports.default = router;
