import { Router } from "express";
import { createStore } from "../controller/storeController";


const router = Router();

router.route("/:userID/create-store").post(createStore)

export default router