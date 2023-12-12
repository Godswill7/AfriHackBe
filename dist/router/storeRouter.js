"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storeController_1 = require("../controller/storeController");
const router = (0, express_1.Router)();
router.route("/:userID/create-store").post(storeController_1.createStore);
exports.default = router;
